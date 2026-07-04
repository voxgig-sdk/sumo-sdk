-- Sumo SDK

local vs = require("utility.struct.struct")
local Utility = require("core.utility_type")
local Spec = require("core.spec")
local helpers = require("core.helpers")

-- Load utility registration (populates Utility._registrar)
require("utility.register")

-- Load features
local BaseFeature = require("feature.base_feature")
local features_factory = require("features")


local SumoSDK = {}
SumoSDK.__index = SumoSDK


local function _make_feature(name)
  local factory = features_factory[name]
  if factory ~= nil then
    return factory()
  end
  return features_factory.base()
end

SumoSDK._make_feature = _make_feature


function SumoSDK.new(options)
  local self = setmetatable({}, SumoSDK)
  self.mode = "live"
  self.features = {}
  self.options = nil

  local utility = Utility.new()
  self._utility = utility

  local config = require("config")()

  self._rootctx = utility.make_context({
    client = self,
    utility = utility,
    config = config,
    options = options or {},
    shared = {},
  }, nil)

  self.options = utility.make_options(self._rootctx)

  if vs.getpath(self.options, "feature.test.active") == true then
    self.mode = "test"
  end

  self._rootctx.options = self.options

  -- Add features from config.
  local feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
  if feature_opts ~= nil then
    local feature_items = vs.items(feature_opts)
    if feature_items ~= nil then
      for _, item in ipairs(feature_items) do
        local fname = item[1]
        local fopts = helpers.to_map(item[2])
        if fopts ~= nil and fopts["active"] == true then
          utility.feature_add(self._rootctx, _make_feature(fname))
        end
      end
    end
  end

  -- Add extension features.
  local extend = vs.getprop(self.options, "extend")
  if type(extend) == "table" then
    for _, f in ipairs(extend) do
      if type(f) == "table" and type(f.get_name) == "function" then
        utility.feature_add(self._rootctx, f)
      end
    end
  end

  -- Initialize features.
  for _, f in ipairs(self.features) do
    utility.feature_init(self._rootctx, f)
  end

  utility.feature_hook(self._rootctx, "PostConstruct")

  -- #BuildFeatures

  return self
end


function SumoSDK:options_map()
  local out = vs.clone(self.options)
  if type(out) == "table" then
    return out
  end
  return {}
end


function SumoSDK:get_utility()
  return Utility.copy(self._utility)
end


function SumoSDK:get_root_ctx()
  return self._rootctx
end


function SumoSDK:prepare(fetchargs)
  local utility = self._utility

  fetchargs = fetchargs or {}

  local ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl")) or {}

  local ctx = utility.make_context({
    opname = "prepare",
    ctrl = ctrl,
  }, self._rootctx)

  local options = self.options

  local path = vs.getprop(fetchargs, "path") or ""
  if type(path) ~= "string" then path = "" end

  local method = vs.getprop(fetchargs, "method") or "GET"
  if type(method) ~= "string" then method = "GET" end

  local params = helpers.to_map(vs.getprop(fetchargs, "params")) or {}
  local query = helpers.to_map(vs.getprop(fetchargs, "query")) or {}

  local headers = utility.prepare_headers(ctx)

  local base = vs.getprop(options, "base") or ""
  if type(base) ~= "string" then base = "" end
  local prefix = vs.getprop(options, "prefix") or ""
  if type(prefix) ~= "string" then prefix = "" end
  local suffix = vs.getprop(options, "suffix") or ""
  if type(suffix) ~= "string" then suffix = "" end

  ctx.spec = Spec.new({
    base = base,
    prefix = prefix,
    suffix = suffix,
    path = path,
    method = method,
    params = params,
    query = query,
    headers = headers,
    body = vs.getprop(fetchargs, "body"),
    step = "start",
  })

  -- Merge user-provided headers.
  local uh = vs.getprop(fetchargs, "headers")
  if type(uh) == "table" then
    for k, v in pairs(uh) do
      ctx.spec.headers[k] = v
    end
  end

  local _, err = utility.prepare_auth(ctx)
  if err ~= nil then
    return nil, err
  end

  return utility.make_fetch_def(ctx)
end


function SumoSDK:direct(fetchargs)
  local utility = self._utility

  local fetchdef, err = self:prepare(fetchargs)
  if err ~= nil then
    return { ok = false, err = err }, nil
  end

  fetchargs = fetchargs or {}
  local ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl")) or {}

  local ctx = utility.make_context({
    opname = "direct",
    ctrl = ctrl,
  }, self._rootctx)

  local url = fetchdef["url"] or ""
  local fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

  if fetch_err ~= nil then
    return { ok = false, err = fetch_err }, nil
  end

  if fetched == nil then
    return {
      ok = false,
      err = ctx:make_error("direct_no_response", "response: undefined"),
    }, nil
  end

  if type(fetched) == "table" then
    local status = helpers.to_int(vs.getprop(fetched, "status"))
    local headers = vs.getprop(fetched, "headers") or {}

    -- No-body responses (204, 304) and explicit zero content-length
    -- must skip JSON parsing — calling json() on an empty body errors.
    local content_length = nil
    if type(headers) == "table" then
      content_length = headers["content-length"]
    end
    local no_body = status == 204 or status == 304 or tostring(content_length) == "0"

    local json_data = nil
    if not no_body then
      local jf = vs.getprop(fetched, "json")
      if type(jf) == "function" then
        local ok, result = pcall(jf)
        if ok then
          json_data = result
        end
        -- Non-JSON body: json_data stays nil, status/headers preserved.
      end
    end

    return {
      ok = status >= 200 and status < 300,
      status = status,
      headers = headers,
      data = json_data,
    }, nil
  end

  return {
    ok = false,
    err = ctx:make_error("direct_invalid", "invalid response type"),
  }, nil
end



-- Idiomatic facade: client:basho():list() / client:basho():load({ id = ... })
function SumoSDK:basho(data)
  local EntityMod = require("entity.basho_entity")
  if data == nil then
    if self._basho == nil then
      self._basho = EntityMod.new(self, nil)
    end
    return self._basho
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:basho() instead.
function SumoSDK:Basho(data)
  local EntityMod = require("entity.basho_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:kimarite():list() / client:kimarite():load({ id = ... })
function SumoSDK:kimarite(data)
  local EntityMod = require("entity.kimarite_entity")
  if data == nil then
    if self._kimarite == nil then
      self._kimarite = EntityMod.new(self, nil)
    end
    return self._kimarite
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:kimarite() instead.
function SumoSDK:Kimarite(data)
  local EntityMod = require("entity.kimarite_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:measurement():list() / client:measurement():load({ id = ... })
function SumoSDK:measurement(data)
  local EntityMod = require("entity.measurement_entity")
  if data == nil then
    if self._measurement == nil then
      self._measurement = EntityMod.new(self, nil)
    end
    return self._measurement
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:measurement() instead.
function SumoSDK:Measurement(data)
  local EntityMod = require("entity.measurement_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:rank():list() / client:rank():load({ id = ... })
function SumoSDK:rank(data)
  local EntityMod = require("entity.rank_entity")
  if data == nil then
    if self._rank == nil then
      self._rank = EntityMod.new(self, nil)
    end
    return self._rank
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:rank() instead.
function SumoSDK:Rank(data)
  local EntityMod = require("entity.rank_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:rikishi():list() / client:rikishi():load({ id = ... })
function SumoSDK:rikishi(data)
  local EntityMod = require("entity.rikishi_entity")
  if data == nil then
    if self._rikishi == nil then
      self._rikishi = EntityMod.new(self, nil)
    end
    return self._rikishi
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:rikishi() instead.
function SumoSDK:Rikishi(data)
  local EntityMod = require("entity.rikishi_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:shikona():list() / client:shikona():load({ id = ... })
function SumoSDK:shikona(data)
  local EntityMod = require("entity.shikona_entity")
  if data == nil then
    if self._shikona == nil then
      self._shikona = EntityMod.new(self, nil)
    end
    return self._shikona
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:shikona() instead.
function SumoSDK:Shikona(data)
  local EntityMod = require("entity.shikona_entity")
  return EntityMod.new(self, data)
end




function SumoSDK.test(testopts, sdkopts)
  sdkopts = sdkopts or {}
  sdkopts = vs.clone(sdkopts)
  if type(sdkopts) ~= "table" then
    sdkopts = {}
  end

  testopts = testopts or {}
  testopts = vs.clone(testopts)
  if type(testopts) ~= "table" then
    testopts = {}
  end
  testopts["active"] = true

  vs.setpath(sdkopts, "feature.test", testopts)

  local sdk = SumoSDK.new(sdkopts)
  sdk.mode = "test"

  return sdk
end


return SumoSDK
