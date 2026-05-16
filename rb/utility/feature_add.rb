# Sumo SDK utility: feature_add
module SumoUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
