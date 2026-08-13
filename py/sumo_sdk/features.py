# Sumo SDK feature factory

from sumo_sdk.feature.base_feature import SumoBaseFeature
from sumo_sdk.feature.test_feature import SumoTestFeature


def _make_feature(name):
    features = {
        "base": lambda: SumoBaseFeature(),
        "test": lambda: SumoTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
