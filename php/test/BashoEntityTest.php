<?php
declare(strict_types=1);

// Basho entity test

require_once __DIR__ . '/../sumo_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class BashoEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = SumoSDK::test(null, null);
        $ent = $testsdk->Basho(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = basho_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "basho." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set SUMO_TEST_BASHO_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $basho_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.basho")));
        $basho_ref01_data = null;
        if (count($basho_ref01_data_raw) > 0) {
            $basho_ref01_data = Helpers::to_map($basho_ref01_data_raw[0][1]);
        }

        // LIST
        $basho_ref01_ent = $client->Basho(null);
        $basho_ref01_match = [
            "basho_id" => $setup["idmap"]["basho01"],
            "day" => $setup["idmap"]["day01"],
            "division" => $setup["idmap"]["division01"],
        ];

        [$basho_ref01_list_result, $err] = $basho_ref01_ent->list($basho_ref01_match, null);
        $this->assertNull($err);
        $this->assertIsArray($basho_ref01_list_result);

        // LOAD
        $basho_ref01_match_dt0 = [
            "id" => $basho_ref01_data["id"],
        ];
        [$basho_ref01_data_dt0_loaded, $err] = $basho_ref01_ent->load($basho_ref01_match_dt0, null);
        $this->assertNull($err);
        $basho_ref01_data_dt0_load_result = Helpers::to_map($basho_ref01_data_dt0_loaded);
        $this->assertNotNull($basho_ref01_data_dt0_load_result);
        $this->assertEquals($basho_ref01_data_dt0_load_result["id"], $basho_ref01_data["id"]);

    }
}

function basho_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/basho/BashoTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = SumoSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["basho01", "basho02", "basho03", "banzuke01", "banzuke02", "banzuke03", "torikumi01", "torikumi02", "torikumi03", "day01", "division01"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("SUMO_TEST_BASHO_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "SUMO_TEST_BASHO_ENTID" => $idmap,
        "SUMO_TEST_LIVE" => "FALSE",
        "SUMO_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["SUMO_TEST_BASHO_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["SUMO_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
            ],
            $extra ?? [],
        ]);
        $client = new SumoSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["SUMO_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["SUMO_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
