# Sumo SDK utility: make_context
require_relative '../core/context'
module SumoUtilities
  MakeContext = ->(ctxmap, basectx) {
    SumoContext.new(ctxmap, basectx)
  }
end
