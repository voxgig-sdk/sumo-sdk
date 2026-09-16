

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


describe('RankEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when SUMO_TEST_LIVE=TRUE.
  afterEach(liveDelay('SUMO_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = SumoSDK.test()
    const ent = testsdk.Rank()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.SUMO_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'rank.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"division","req":false,"short":"Division the rank belongs to","type":"`$STRING`","index$":0},{"active":true,"name":"id","req":false,"short":"Unique identifier for the rank","type":"`$STRING`","index$":1},{"active":true,"name":"level","req":false,"short":"Hierarchical level of the rank","type":"`$INTEGER`","index$":2},{"active":true,"name":"name","req":false,"short":"Name of the rank","type":"`$STRING`","index$":3}],"id":{"field":"id","name":"id"},"name":"rank","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /api/ranks","json":"{\"operationId\":\"getRanks\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"division\":{\"description\":\"Division the rank belongs to\",\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the rank\",\"type\":\"string\"},\"level\":{\"description\":\"Hierarchical level of the rank\",\"type\":\"integer\"},\"name\":{\"description\":\"Name of the rank\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response with list of ranks\"},\"500\":{\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/ranks","segments":[{"lit":"api"},{"lit":"ranks"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"rank","name__orig":"rank","Name":"Rank","name_":"rank","name-":"rank","NAME":"RANK","index$":3}, {"active":true,"entity":"rank","key$":"BasicRankFlow","kind":"basic","name":"BasicRankFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"rank_ref01"}}],"index$":0}]}, 'Rank')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let rank_ref01_data = Object.values(setup.data.existing.rank)[0] as any

    // LIST
    const rank_ref01_ent = client.Rank()
    const rank_ref01_match: any = {}

    const rank_ref01_list = (await rank_ref01_ent.list(rank_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/rank/RankTestData.json')

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
    ['rank01','rank02','rank03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'SUMO_TEST_RANK_ENTID': idmap,
    'SUMO_TEST_LIVE': 'FALSE',
    'SUMO_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['SUMO_TEST_RANK_ENTID']

  const live = 'TRUE' === env.SUMO_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['SUMO_TEST_RANK_ENTID']
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
  
