import fs from 'fs'
import test from 'ava'
import ima from '../src/index'
import {prepareDocument} from './helpers/dom'

const imageBase64Url =
  fs.readFileSync(
    './node_modules/base64-image-fixture/png/1x1-transparent',
    'utf8'
  )

test.beforeEach(() => {
  prepareDocument()
})

test('ima.load() - with remote image url', async t => {
  t.plan(1)

  const img = await ima.load(imageBase64Url)
  t.is(img.src, imageBase64Url)
})

// test('ima.load() - with CORS remote image url', async t => {
//   t.plan(2)
//
//   const img = await ima.load(imageBase64Url, {crossOrigin: 'Anonymous'})
//   t.is(img.src, imageBase64Url)
//   t.is(img.crossOrigin, 'Anonymous')
// })

// test('ima.load() - with File', t => {
// })
//
// test('ima.load() - with Blob', t => {
// })
//
// test('ima.load() - empty', t => {
// })
//
// test('ima.load() - unknow image resource', t => {
// })
//
// test('ima.load() - File API not support', t => {
// })
