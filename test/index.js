import test from 'ava'

const ima = require('../src/index')
const prepareDocument = require('./helpers/dom').prepareDocument

test('ima() - empty selector', t => {
  t.throws(() => ima(null), /Selector is empty\./)
  t.throws(() => ima(undefined), /Selector is empty\./)
  t.throws(() => ima(''), /Selector is empty\./)
})

test('ima("img-id") - with image element id', t => {
  prepareDocument('<img id="img-id" />')
  t.is(ima('img-id').type, 'image')
  t.is(ima('img-id').origin, document.getElementById('img-id'))
})

test('ima("canvas-id") - with canvas element id', t => {
  prepareDocument('<canvas id="canvas-id" />')
  t.is(ima('canvas-id').type, 'canvas')
  t.is(ima('canvas-id').origin, document.getElementById('canvas-id'))
})

test('ima("unknow-id") - with unknown element id', t => {
  prepareDocument()
  t.throws(() => {
    ima('unknow-id')
  }, /Can't find the element with id "unknow-id"/)
})

test('ima(Image) - with image element', t => {
  prepareDocument('<img />')
  const image = document.getElementsByTagName('img')[0]
  t.is(ima(image).type, 'image')
  t.is(ima(image).origin, image)
})

test('ima(Canvas) - with canvas element', t => {
  prepareDocument('<canvas />')
  const canvas = document.getElementsByTagName('canvas')[0]
  t.is(ima(canvas).type, 'canvas')
  t.is(ima(canvas).origin, canvas)
})

test('ima() - without image or canvas element', t => {
  prepareDocument('<div />')
  const elem = document.getElementsByTagName('div')[0]
  t.throws(
    () => ima(elem),
    /Initial element should be HTMLImageElement or HTMLCanvasElement/
  )
})

test('ima({width, height}) - create canvas', t => {
  const size = {width: 200, height: 300}
  t.is(ima(size).type, 'canvas')
  t.is(ima(size).origin.width, size.width)
  t.is(ima(size).origin.height, size.height)
})
