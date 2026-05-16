-- Sumo SDK error

local SumoError = {}
SumoError.__index = SumoError


function SumoError.new(code, msg, ctx)
  local self = setmetatable({}, SumoError)
  self.is_sdk_error = true
  self.sdk = "Sumo"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function SumoError:error()
  return self.msg
end


function SumoError:__tostring()
  return self.msg
end


return SumoError
