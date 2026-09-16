

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { SumoSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('BashoEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when SUMO_TEST_LIVE=TRUE.
  afterEach(liveDelay('SUMO_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = SumoSDK.test()
    const ent = testsdk.Basho()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.SUMO_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'basho.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"format":"date","name":"endDate","req":false,"short":"End date of the tournament","type":"`$STRING`","index$":0},{"active":true,"name":"id","req":false,"short":"Unique identifier for the basho","type":"`$STRING`","index$":1},{"active":true,"name":"kimarite","req":false,"short":"Winning technique used (if match completed)","type":"`$STRING`","index$":2},{"active":true,"name":"matchNumber","req":false,"short":"Match number in the day's schedule","type":"`$INTEGER`","index$":3},{"active":true,"name":"month","req":false,"short":"Month of the tournament","type":"`$INTEGER`","index$":4},{"active":true,"name":"rank","req":false,"short":"Rank in the banzuke","type":"`$STRING`","index$":5},{"active":true,"name":"rikishi1Id","req":false,"short":"First rikishi identifier","type":"`$STRING`","index$":6},{"active":true,"name":"rikishi2Id","req":false,"short":"Second rikishi identifier","type":"`$STRING`","index$":7},{"active":true,"name":"rikishiId","req":false,"short":"Unique identifier for the rikishi","type":"`$STRING`","index$":8},{"active":true,"name":"shikona","req":false,"short":"Ring name of the rikishi","type":"`$STRING`","index$":9},{"active":true,"name":"side","req":false,"short":"Side of the banzuke (east or west)","type":"`$STRING`","index$":10},{"active":true,"format":"date","name":"startDate","req":false,"short":"Start date of the tournament","type":"`$STRING`","index$":11},{"active":true,"name":"venue","req":false,"short":"Tournament venue","type":"`$STRING`","index$":12},{"active":true,"name":"winnerId","req":false,"short":"Winner rikishi identifier (if match completed)","type":"`$STRING`","index$":13},{"active":true,"name":"year","req":false,"short":"Year of the tournament","type":"`$INTEGER`","index$":14}],"id":{"field":"id","name":"id"},"name":"basho","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"basho_id","orig":"basho_id","reqd":true,"type":"`$STRING`","index$":0},{"active":true,"kind":"param","name":"day","orig":"day","reqd":true,"type":"`$INTEGER`","index$":1},{"active":true,"kind":"param","name":"division","orig":"division","reqd":true,"type":"`$STRING`","index$":2}]},"contract":{"id":"GET /api/basho/{bashoId}/torikumi/{division}/{day}","json":"{\"operationId\":\"getBashoTorikumi\",\"parameters\":[{\"description\":\"Unique identifier of the basho tournament\",\"in\":\"path\",\"name\":\"bashoId\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Sumo division (e.g., makuuchi, juryo, makushita)\",\"in\":\"path\",\"name\":\"division\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Day of the tournament (typically 1-15)\",\"in\":\"path\",\"name\":\"day\",\"required\":true,\"schema\":{\"maximum\":15,\"minimum\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"kimarite\":{\"description\":\"Winning technique used (if match completed)\",\"type\":\"string\"},\"matchNumber\":{\"description\":\"Match number in the day's schedule\",\"type\":\"integer\"},\"rikishi1Id\":{\"description\":\"First rikishi identifier\",\"type\":\"string\"},\"rikishi2Id\":{\"description\":\"Second rikishi identifier\",\"type\":\"string\"},\"winnerId\":{\"description\":\"Winner rikishi identifier (if match completed)\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response with torikumi schedule\"},\"404\":{\"description\":\"Basho, division, or day not found\"},\"500\":{\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/basho/{bashoId}/torikumi/{division}/{day}","rename":{"param":{"bashoId":"basho_id"}},"segments":[{"lit":"api"},{"lit":"basho"},{"var":"basho_id"},{"lit":"torikumi"},{"var":"division"},{"var":"day"}],"select":{"exist":["basho_id","day","division"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"division","orig":"division","reqd":true,"type":"`$STRING`","index$":0},{"active":true,"kind":"param","name":"id","orig":"basho_id","reqd":true,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /api/basho/{bashoId}/banzuke/{division}","json":"{\"operationId\":\"getBashoBanzuke\",\"parameters\":[{\"description\":\"Unique identifier of the basho tournament\",\"in\":\"path\",\"name\":\"bashoId\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Sumo division (e.g., makuuchi, juryo, makushita)\",\"in\":\"path\",\"name\":\"division\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"rank\":{\"description\":\"Rank in the banzuke\",\"type\":\"string\"},\"rikishiId\":{\"description\":\"Unique identifier for the rikishi\",\"type\":\"string\"},\"shikona\":{\"description\":\"Ring name of the rikishi\",\"type\":\"string\"},\"side\":{\"description\":\"Side of the banzuke (east or west)\",\"enum\":[\"east\",\"west\"],\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response with banzuke rankings\"},\"404\":{\"description\":\"Basho or division not found\"},\"500\":{\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/basho/{bashoId}/banzuke/{division}","rename":{"param":{"bashoId":"id"}},"segments":[{"lit":"api"},{"lit":"basho"},{"var":"id"},{"lit":"banzuke"},{"var":"division"}],"select":{"exist":["division","id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"basho_id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /api/basho/{bashoId}","json":"{\"operationId\":\"getBashoById\",\"parameters\":[{\"description\":\"Unique identifier of the basho tournament\",\"in\":\"path\",\"name\":\"bashoId\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"endDate\":{\"description\":\"End date of the tournament\",\"format\":\"date\",\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the basho\",\"type\":\"string\"},\"month\":{\"description\":\"Month of the tournament\",\"type\":\"integer\"},\"startDate\":{\"description\":\"Start date of the tournament\",\"format\":\"date\",\"type\":\"string\"},\"venue\":{\"description\":\"Tournament venue\",\"type\":\"string\"},\"year\":{\"description\":\"Year of the tournament\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful response with basho details\"},\"404\":{\"description\":\"Basho not found\"},\"500\":{\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/basho/{bashoId}","rename":{"param":{"bashoId":"id"}},"segments":[{"lit":"api"},{"lit":"basho"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[["banzuke"],["basho","torikumi"]]},"key$":"basho","name__orig":"basho","Name":"Basho","name_":"basho","name-":"basho","NAME":"BASHO","index$":0}, {"active":true,"entity":"basho","key$":"BasicBashoFlow","kind":"basic","name":"BasicBashoFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{"basho_id":"basho01","day":"day01","division":"division01"},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"basho_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"basho_ref01","srcdatavar":"basho_ref01_data","suffix":"_dt0"},"match":{"id":"basho01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-basho_ref01"}}],"index$":1}]}, 'Basho')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let basho_ref01_data = Object.values(setup.data.existing.basho)[0] as any

    // LIST
    const basho_ref01_ent = client.Basho()
    const basho_ref01_match: any = {}
    basho_ref01_match['basho_id'] = setup.idmap['basho01']
    basho_ref01_match['day'] = setup.idmap['day01']
    basho_ref01_match['division'] = setup.idmap['division01']

    const basho_ref01_list = (await basho_ref01_ent.list(basho_ref01_match)).map((e: any) => e.data())


    // LOAD
    const basho_ref01_match_dt0: any = {}
    basho_ref01_match_dt0.id = basho_ref01_data.id
    const basho_ref01_data_dt0 = (await basho_ref01_ent.load(basho_ref01_match_dt0)).data()
    assert(basho_ref01_data_dt0.id === basho_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/basho/BashoTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = SumoSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['basho01','basho02','basho03','banzuke01','banzuke02','banzuke03','basho01','basho02','basho03','torikumi01','torikumi02','torikumi03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'SUMO_TEST_BASHO_ENTID': idmap,
    'SUMO_TEST_LIVE': 'FALSE',
    'SUMO_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['SUMO_TEST_BASHO_ENTID']

  const live = 'TRUE' === env.SUMO_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['SUMO_TEST_BASHO_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new SumoSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
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
  }

  return setup
}
  
