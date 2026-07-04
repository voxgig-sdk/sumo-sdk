# Basho direct test

import json
import pytest

from utility.voxgig_struct import voxgig_struct as vs
from sumo_sdk import SumoSDK
from core import helpers
from test import runner


class TestBashoDirect:

    def test_should_direct_list_basho(self):
        setup = _basho_direct_setup([
            {"id": "direct01"},
            {"id": "direct02"},
        ])
        _skip, _reason = runner.is_control_skipped("direct", "direct-list-basho", "live" if setup["live"] else "unit")
        if _skip:
            # pytest already imported at module scope
            pytest.skip(_reason or "skipped via sdk-test-control.json")
            return
        if setup["live"]:
            for _live_key in ["basho01", "day01", "division01"]:
                if setup["idmap"].get(_live_key) is None:
                    # pytest already imported at module scope
                    pytest.skip(f"live test needs {_live_key} via *_ENTID env var (synthetic IDs only)")
                    return

        client = setup["client"]

        params = {}
        if setup["live"]:
            params["basho_id"] = setup["idmap"]["basho01"]
        else:
            params["basho_id"] = "direct01"
        if setup["live"]:
            params["day"] = setup["idmap"]["day01"]
        else:
            params["day"] = "direct01"
        if setup["live"]:
            params["division"] = setup["idmap"]["division01"]
        else:
            params["division"] = "direct01"

        result = client.direct({
            "path": "api/basho/{basho_id}/torikumi/{division}/{day}",
            "method": "GET",
            "params": params,
        })
        if setup["live"]:
            # Live mode is lenient: synthetic IDs frequently 4xx and the
            # list-response shape varies wildly across public APIs. Skip
            # rather than fail when the call doesn't return a usable list.
            if result.get("err") is not None:
                pytest.skip(f"list call failed (likely synthetic IDs against live API): {result.get('err')}")
                return
            if not result.get("ok"):
                pytest.skip("list call not ok (likely synthetic IDs against live API)")
                return
            status = helpers.to_int(result["status"])
            if status < 200 or status >= 300:
                pytest.skip(f"expected 2xx status, got {status}")
                return
        else:
            assert result["ok"] is True
            assert helpers.to_int(result["status"]) == 200
            assert isinstance(result["data"], list)
            assert len(result["data"]) == 2
            assert len(setup["calls"]) == 1

    def test_should_direct_load_basho(self):
        setup = _basho_direct_setup({"id": "direct01"})
        _skip, _reason = runner.is_control_skipped("direct", "direct-load-basho", "live" if setup["live"] else "unit")
        if _skip:
            # pytest already imported at module scope
            pytest.skip(_reason or "skipped via sdk-test-control.json")
            return
        if setup["live"]:
            # pytest already imported at module scope
            pytest.skip("live direct-load needs real ID — set *_ENTID env var with real IDs to run")
            return

        client = setup["client"]

        params = {}
        query = {}
        if not setup["live"]:
            params["division"] = "direct01"
            params["id"] = "direct02"

        result = client.direct({
            "path": "api/basho/{id}/banzuke/{division}",
            "method": "GET",
            "params": params,
            "query": query,
        })
        if setup["live"]:
            # Live mode is lenient: synthetic IDs frequently 4xx. Skip
            # rather than fail when the load endpoint isn't reachable
            # with the IDs we can construct from setup.idmap.
            if result.get("err") is not None:
                pytest.skip(f"load call failed (likely synthetic IDs against live API): {result.get('err')}")
                return
            if not result.get("ok"):
                pytest.skip("load call not ok (likely synthetic IDs against live API)")
                return
            status = helpers.to_int(result["status"])
            if status < 200 or status >= 300:
                pytest.skip(f"expected 2xx status, got {status}")
                return
        else:
            assert result["ok"] is True
            assert helpers.to_int(result["status"]) == 200
            assert result["data"] is not None
            if isinstance(result["data"], dict):
                assert result["data"]["id"] == "direct01"
            assert len(setup["calls"]) == 1



def _basho_direct_setup(mockres):
    runner.load_env_local()

    calls = []

    env = runner.env_override({
        "SUMO_TEST_BASHO_ENTID": {},
        "SUMO_TEST_LIVE": "FALSE",
    })

    live = env.get("SUMO_TEST_LIVE") == "TRUE"

    if live:
        merged_opts = {
        }
        client = SumoSDK(merged_opts)
        return {
            "client": client,
            "calls": calls,
            "live": True,
            "idmap": {},
        }

    def mock_fetch(url, init):
        calls.append({"url": url, "init": init})
        return {
            "status": 200,
            "statusText": "OK",
            "headers": {},
            "json": lambda: mockres if mockres is not None else {"id": "direct01"},
            "body": "mock",
        }, None

    client = SumoSDK({
        "base": "http://localhost:8080",
        "system": {
            "fetch": mock_fetch,
        },
    })

    return {
        "client": client,
        "calls": calls,
        "live": False,
        "idmap": {},
    }
