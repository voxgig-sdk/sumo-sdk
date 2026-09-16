

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


describe('ShikonaEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when SUMO_TEST_LIVE=TRUE.
  afterEach(liveDelay('SUMO_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = SumoSDK.test()
    const ent = testsdk.Shikona()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.SUMO_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'shikona.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"format":"date","name":"endDate","req":false,"short":"Date when rikishi stopped using this shikona","type":"`$STRING`","index$":0},{"active":true,"name":"rikishiId","req":false,"short":"Identifier of the rikishi using this shikona","type":"`$STRING`","index$":1},{"active":true,"name":"shikona","req":false,"short":"Ring name (shikona)","type":"`$STRING`","index$":2},{"active":true,"format":"date","name":"startDate","req":false,"short":"Date when rikishi started using this shikona","type":"`$STRING`","index$":3}],"name":"shikona","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /api/shikonas","json":"{\"operationId\":\"getShikonas\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"endDate\":{\"description\":\"Date when rikishi stopped using this shikona\",\"format\":\"date\",\"type\":\"string\"},\"rikishiId\":{\"description\":\"Identifier of the rikishi using this shikona\",\"type\":\"string\"},\"shikona\":{\"description\":\"Ring name (shikona)\",\"type\":\"string\"},\"startDate\":{\"description\":\"Date when rikishi started using this shikona\",\"format\":\"date\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response with list of shikonas\"},\"500\":{\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/shikonas","segments":[{"lit":"api"},{"lit":"shikonas"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"shikona","name__orig":"shikona","Name":"Shikona","name_":"shikona","name-":"shikona","NAME":"SHIKONA","index$":5}, {"active":true,"entity":"shikona","key$":"BasicShikonaFlow","kind":"basic","name":"BasicShikonaFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"shikona_ref01"}}],"index$":0}]}, 'Shikona')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let shikona_ref01_data = Object.values(setup.data.existing.shikona)[0] as any

    // LIST
    const shikona_ref01_ent = client.Shikona()
    const shikona_ref01_match: any = {}

    const shikona_ref01_list = (await shikona_ref01_ent.list(shikona_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/shikona/ShikonaTestData.json')

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
    ['shikona01','shikona02','shikona03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'SUMO_TEST_SHIKONA_ENTID': idmap,
    'SUMO_TEST_LIVE': 'FALSE',
    'SUMO_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['SUMO_TEST_SHIKONA_ENTID']

  const live = 'TRUE' === env.SUMO_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['SUMO_TEST_SHIKONA_ENTID']
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
  
