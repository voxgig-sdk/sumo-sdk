-- Basho entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("sumo_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

describe("BashoEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:Basho(nil)
    assert.is_not_nil(ent)
  end)

  it("should run basic flow", function()
    local setup = basho_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"list", "load"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "basho." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    -- The basic flow consumes synthetic IDs from the fixture. In live mode
    -- without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup.synthetic_only then
      pending("live entity test uses synthetic IDs from fixture — set SUMO_TEST_BASHO_ENTID JSON to run live")
      return
    end
    local client = setup.client

    -- Bootstrap entity data from existing test data.
    local basho_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.basho")))
    local basho_ref01_data = nil
    if #basho_ref01_data_raw > 0 then
      basho_ref01_data = helpers.to_map(basho_ref01_data_raw[1][2])
    end

    -- LIST
    local basho_ref01_ent = client:Basho(nil)
    local basho_ref01_match = {
      ["basho_id"] = setup.idmap["basho01"],
      ["day"] = setup.idmap["day01"],
      ["division"] = setup.idmap["division01"],
    }

    local basho_ref01_list_result, err = basho_ref01_ent:list(basho_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(basho_ref01_list_result)

    -- LOAD
    local basho_ref01_match_dt0 = {
      id = basho_ref01_data["id"],
    }
    local basho_ref01_data_dt0_loaded, err = basho_ref01_ent:load(basho_ref01_match_dt0, nil)
    assert.is_nil(err)
    local basho_ref01_data_dt0_load_result = helpers.to_map(basho_ref01_data_dt0_loaded)
    assert.is_not_nil(basho_ref01_data_dt0_load_result)
    assert.are.equal(basho_ref01_data_dt0_load_result["id"], basho_ref01_data["id"])

  end)
end)

function basho_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/basho/BashoTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read basho test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "basho01", "basho02", "basho03", "banzuke01", "banzuke02", "banzuke03", "torikumi01", "torikumi02", "torikumi03", "day01", "division01" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Detect ENTID env override before envOverride consumes it. When live
  -- mode is on without a real override, the basic test runs against synthetic
  -- IDs from the fixture and 4xx's. Surface this so the test can skip.
  local entid_env_raw = os.getenv("SUMO_TEST_BASHO_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["SUMO_TEST_BASHO_ENTID"] = idmap,
    ["SUMO_TEST_LIVE"] = "FALSE",
    ["SUMO_TEST_EXPLAIN"] = "FALSE",
    ["SUMO_APIKEY"] = "NONE",
  })

  local idmap_resolved = helpers.to_map(
    env["SUMO_TEST_BASHO_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end

  if env["SUMO_TEST_LIVE"] == "TRUE" then
    local merged_opts = vs.merge({
      {
        apikey = env["SUMO_APIKEY"],
      },
      extra or {},
    })
    client = sdk.new(helpers.to_map(merged_opts))
  end

  local live = env["SUMO_TEST_LIVE"] == "TRUE"
  return {
    client = client,
    data = entity_data,
    idmap = idmap_resolved,
    env = env,
    explain = env["SUMO_TEST_EXPLAIN"] == "TRUE",
    live = live,
    synthetic_only = live and not idmap_overridden,
    now = os.time() * 1000,
  }
end
