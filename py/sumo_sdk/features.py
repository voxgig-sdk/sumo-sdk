# Sumo SDK feature factory

from sumo_sdk.feature.base_feature import SumoBaseFeature
from sumo_sdk.feature.ratelimit_feature import SumoRatelimitFeature
from sumo_sdk.feature.retry_feature import SumoRetryFeature
from sumo_sdk.feature.test_feature import SumoTestFeature
from sumo_sdk.feature.timeout_feature import SumoTimeoutFeature


_FEATURES = {
    "base": lambda: SumoBaseFeature(),
    "ratelimit": lambda: SumoRatelimitFeature(),
    "retry": lambda: SumoRetryFeature(),
    "test": lambda: SumoTestFeature(),
    "timeout": lambda: SumoTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
