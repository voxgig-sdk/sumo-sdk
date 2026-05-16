package = "voxgig-sdk-sumo"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/sumo-sdk.git"
}
description = {
  summary = "Sumo SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["sumo_sdk"] = "sumo_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
