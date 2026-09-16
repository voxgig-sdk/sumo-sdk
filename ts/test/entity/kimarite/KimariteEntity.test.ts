

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


describe('KimariteEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when SUMO_TEST_LIVE=TRUE.
  afterEach(liveDelay('SUMO_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = SumoSDK.test()
    const ent = testsdk.Kimarite()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.SUMO_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'kimarite.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"category","req":false,"short":"Category of the technique","type":"`$STRING`","index$":0},{"active":true,"name":"description","req":false,"short":"Detailed description of the technique","type":"`$STRING`","index$":1},{"active":true,"name":"englishName","req":false,"short":"English translation of the technique name","type":"`$STRING`","index$":2},{"active":true,"name":"frequency","req":false,"short":"Number of times this technique has been used","type":"`$INTEGER`","index$":3},{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":4},{"active":true,"name":"name","req":false,"short":"Name of the kimarite technique","type":"`$STRING`","index$":5}],"id":{"field":"id","name":"id"},"name":"kimarite","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /api/kimarite","json":"{\"operationId\":\"getKimarite\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"category\":{\"description\":\"Category of the technique\",\"type\":\"string\"},\"englishName\":{\"description\":\"English translation of the technique name\",\"type\":\"string\"},\"name\":{\"description\":\"Name of the kimarite technique\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response with list of kimarite\"},\"500\":{\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/kimarite","segments":[{"lit":"api"},{"lit":"kimarite"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"kimarite","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /api/kimarite/{kimarite}","json":"{\"operationId\":\"getKimariteByName\",\"parameters\":[{\"description\":\"Name of the kimarite technique\",\"in\":\"path\",\"name\":\"kimarite\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"category\":{\"description\":\"Category of the technique\",\"type\":\"string\"},\"description\":{\"description\":\"Detailed description of the technique\",\"type\":\"string\"},\"englishName\":{\"description\":\"English translation of the technique name\",\"type\":\"string\"},\"frequency\":{\"description\":\"Number of times this technique has been used\",\"type\":\"integer\"},\"name\":{\"description\":\"Name of the kimarite technique\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response with kimarite details\"},\"404\":{\"description\":\"Kimarite not found\"},\"500\":{\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/kimarite/{kimarite}","rename":{"param":{"kimarite":"id"}},"segments":[{"lit":"api"},{"lit":"kimarite"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"kimarite","name__orig":"kimarite","Name":"Kimarite","name_":"kimarite","name-":"kimarite","NAME":"KIMARITE","index$":1}, {"active":true,"entity":"kimarite","key$":"BasicKimariteFlow","kind":"basic","name":"BasicKimariteFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"kimarite_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"kimarite_ref01","srcdatavar":"kimarite_ref01_data","suffix":"_dt0"},"match":{"id":"kimarite01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-kimarite_ref01"}}],"index$":1}]}, 'Kimarite')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let kimarite_ref01_data = Object.values(setup.data.existing.kimarite)[0] as any

    // LIST
    const kimarite_ref01_ent = client.Kimarite()
    const kimarite_ref01_match: any = {}

    const kimarite_ref01_list = (await kimarite_ref01_ent.list(kimarite_ref01_match)).map((e: any) => e.data())


    // LOAD
    const kimarite_ref01_match_dt0: any = {}
    kimarite_ref01_match_dt0.id = kimarite_ref01_data.id
    const kimarite_ref01_data_dt0 = (await kimarite_ref01_ent.load(kimarite_ref01_match_dt0)).data()
    assert(kimarite_ref01_data_dt0.id === kimarite_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/kimarite/KimariteTestData.json')

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
    ['kimarite01','kimarite02','kimarite03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'SUMO_TEST_KIMARITE_ENTID': idmap,
    'SUMO_TEST_LIVE': 'FALSE',
    'SUMO_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['SUMO_TEST_KIMARITE_ENTID']

  const live = 'TRUE' === env.SUMO_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['SUMO_TEST_KIMARITE_ENTID']
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
  
