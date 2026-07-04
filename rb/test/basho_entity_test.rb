# Basho entity test

require "minitest/autorun"
require "json"
require_relative "../Sumo_sdk"
require_relative "runner"

class BashoEntityTest < Minitest::Test
  def test_create_instance
    testsdk = SumoSDK.test(nil, nil)
    ent = testsdk.Basho(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = basho_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "basho." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set SUMO_TEST_BASHO_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    basho_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.basho")))
    basho_ref01_data = nil
    if basho_ref01_data_raw.length > 0
      basho_ref01_data = Helpers.to_map(basho_ref01_data_raw[0][1])
    end

    # LIST
    basho_ref01_ent = client.Basho(nil)
    basho_ref01_match = {
      "basho_id" => setup[:idmap]["basho01"],
      "day" => setup[:idmap]["day01"],
      "division" => setup[:idmap]["division01"],
    }

    basho_ref01_list_result = basho_ref01_ent.list(basho_ref01_match, nil)
    assert basho_ref01_list_result.is_a?(Array)

    # LOAD
    basho_ref01_match_dt0 = {
      "id" => basho_ref01_data["id"],
    }
    basho_ref01_data_dt0_loaded = basho_ref01_ent.load(basho_ref01_match_dt0, nil)
    basho_ref01_data_dt0_load_result = Helpers.to_map(basho_ref01_data_dt0_loaded)
    assert !basho_ref01_data_dt0_load_result.nil?
    assert_equal basho_ref01_data_dt0_load_result["id"], basho_ref01_data["id"]

  end
end

def basho_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "basho", "BashoTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = SumoSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["basho01", "basho02", "basho03", "banzuke01", "banzuke02", "banzuke03", "torikumi01", "torikumi02", "torikumi03", "day01", "division01"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["SUMO_TEST_BASHO_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "SUMO_TEST_BASHO_ENTID" => idmap,
    "SUMO_TEST_LIVE" => "FALSE",
    "SUMO_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["SUMO_TEST_BASHO_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["SUMO_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
      },
      extra || {},
    ])
    client = SumoSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["SUMO_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["SUMO_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
