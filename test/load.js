/* eslint-disable ava/no-skip-test */
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

test('ima.load() - with CORS remote image url', async t => {
  t.plan(2)

  const img = await ima.load(imageBase64Url, {crossOrigin: 'Anonymous'})
  t.is(img.src, imageBase64Url)
  t.is(img.crossOrigin, 'Anonymous')
})

test.skip('ima.load() - with File', () => {})

test.skip('ima.load() - with Blob', () => {})

test('ima.load() - empty', t => {
  t.throws(() => ima.load(), /Need to specify a resource/)
})

test('ima.load() - unknow image resource', t => {
  t.throws(
    () => ima.load(5566),
    /Resource should be type of File, Blob, or image URL./
  )
})
