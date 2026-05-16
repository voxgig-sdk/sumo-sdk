# ProjectName SDK exists test

import pytest
from sumo_sdk import SumoSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = SumoSDK.test(None, None)
        assert testsdk is not None
