package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/sumo-sdk/go"
	"github.com/voxgig-sdk/sumo-sdk/go/core"

	vs "github.com/voxgig-sdk/sumo-sdk/go/utility/struct"
)

func TestRikishiEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Rikishi(nil)
		if ent == nil {
			t.Fatal("expected non-nil RikishiEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := rikishiBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "rikishi." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set SUMO_TEST_RIKISHI_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		rikishiRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.rikishi", setup.data)))
		var rikishiRef01Data map[string]any
		if len(rikishiRef01DataRaw) > 0 {
			rikishiRef01Data = core.ToMapAny(rikishiRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = rikishiRef01Data

		// LIST
		rikishiRef01Ent := client.Rikishi(nil)
		rikishiRef01Match := map[string]any{}

		rikishiRef01ListResult, err := rikishiRef01Ent.List(rikishiRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, rikishiRef01ListOk := rikishiRef01ListResult.([]any)
		if !rikishiRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", rikishiRef01ListResult)
		}

		// LOAD
		rikishiRef01MatchDt0 := map[string]any{
			"id": rikishiRef01Data["id"],
		}
		rikishiRef01DataDt0Loaded, err := rikishiRef01Ent.Load(rikishiRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		rikishiRef01DataDt0LoadResult := core.ToMapAny(rikishiRef01DataDt0Loaded)
		if rikishiRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if rikishiRef01DataDt0LoadResult["id"] != rikishiRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func rikishiBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "rikishi", "RikishiTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read rikishi test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse rikishi test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"rikishi01", "rikishi02", "rikishi03", "match01", "match02", "match03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("SUMO_TEST_RIKISHI_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"SUMO_TEST_RIKISHI_ENTID": idmap,
		"SUMO_TEST_LIVE":      "FALSE",
		"SUMO_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["SUMO_TEST_RIKISHI_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["SUMO_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
			},
			extra,
		})
		client = sdk.NewSumoSDK(core.ToMapAny(mergedOpts))
	}

	live := env["SUMO_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["SUMO_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
