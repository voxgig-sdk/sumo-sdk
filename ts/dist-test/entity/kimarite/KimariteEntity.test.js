"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('KimariteEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when SUMO_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('SUMO_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.SumoSDK.test();
        const ent = testsdk.Kimarite();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.SUMO_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'kimarite.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "category", "req": false, "short": "Category of the technique", "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "description", "req": false, "short": "Detailed description of the technique", "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "englishName", "req": false, "short": "English translation of the technique name", "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "frequency", "req": false, "short": "Number of times this technique has been used", "type": "`$INTEGER`", "index$": 3 }, { "active": true, "name": "id", "req": false, "type": "`$STRING`", "index$": 4 }, { "active": true, "name": "name", "req": false, "short": "Name of the kimarite technique", "type": "`$STRING`", "index$": 5 }], "id": { "field": "id", "name": "id" }, "name": "kimarite", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": {}, "contract": { "id": "GET /api/kimarite", "json": "{\"operationId\":\"getKimarite\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"category\":{\"description\":\"Category of the technique\",\"type\":\"string\"},\"englishName\":{\"description\":\"English translation of the technique name\",\"type\":\"string\"},\"name\":{\"description\":\"Name of the kimarite technique\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response with list of kimarite\"},\"500\":{\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/api/kimarite", "segments": [{ "lit": "api" }, { "lit": "kimarite" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "id", "orig": "kimarite", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /api/kimarite/{kimarite}", "json": "{\"operationId\":\"getKimariteByName\",\"parameters\":[{\"description\":\"Name of the kimarite technique\",\"in\":\"path\",\"name\":\"kimarite\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"category\":{\"description\":\"Category of the technique\",\"type\":\"string\"},\"description\":{\"description\":\"Detailed description of the technique\",\"type\":\"string\"},\"englishName\":{\"description\":\"English translation of the technique name\",\"type\":\"string\"},\"frequency\":{\"description\":\"Number of times this technique has been used\",\"type\":\"integer\"},\"name\":{\"description\":\"Name of the kimarite technique\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response with kimarite details\"},\"404\":{\"description\":\"Kimarite not found\"},\"500\":{\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/api/kimarite/{kimarite}", "rename": { "param": { "kimarite": "id" } }, "segments": [{ "lit": "api" }, { "lit": "kimarite" }, { "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "kimarite", "name__orig": "kimarite", "Name": "Kimarite", "name_": "kimarite", "name-": "kimarite", "NAME": "KIMARITE", "index$": 1 }, { "active": true, "entity": "kimarite", "key$": "BasicKimariteFlow", "kind": "basic", "name": "BasicKimariteFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "kimarite_ref01" } }], "index$": 0 }, { "active": true, "data": {}, "input": { "ref": "kimarite_ref01", "srcdatavar": "kimarite_ref01_data", "suffix": "_dt0" }, "match": { "id": "kimarite01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-kimarite_ref01" } }], "index$": 1 }] }, 'Kimarite');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let kimarite_ref01_data = Object.values(setup.data.existing.kimarite)[0];
        // LIST
        const kimarite_ref01_ent = client.Kimarite();
        const kimarite_ref01_match = {};
        const kimarite_ref01_list = (await kimarite_ref01_ent.list(kimarite_ref01_match)).map((e) => e.data());
        // LOAD
        const kimarite_ref01_match_dt0 = {};
        kimarite_ref01_match_dt0.id = kimarite_ref01_data.id;
        const kimarite_ref01_data_dt0 = (await kimarite_ref01_ent.load(kimarite_ref01_match_dt0)).data();
        (0, node_assert_1.default)(kimarite_ref01_data_dt0.id === kimarite_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/kimarite/KimariteTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.SumoSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['kimarite01', 'kimarite02', 'kimarite03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'SUMO_TEST_KIMARITE_ENTID': idmap,
        'SUMO_TEST_LIVE': 'FALSE',
        'SUMO_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['SUMO_TEST_KIMARITE_ENTID'];
    const live = 'TRUE' === env.SUMO_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['SUMO_TEST_KIMARITE_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.SumoSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.SUMO_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=KimariteEntity.test.js.map