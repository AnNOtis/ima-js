import test from 'ava'
import jsdom from 'jsdom'

import ima, {IMAGE_TYPE, CANVAS_TYPE} from '../src/index'

test('ima() - empty selector', t => {
  t.throws(() => ima(null), /Selector is empty\./)
  t.throws(() => ima(undefined), /Selector is empty\./)
  t.throws(() => ima(''), /Selector is empty\./)
})

test('ima("img-id") - with image element id', t => {
  prepareDocument('<img id="img-id" />')
  t.is(ima('img-id').type, IMAGE_TYPE)
  t.is(ima('img-id').origin, document.getElementById('img-id'))
})

test('ima("canvas-id") - with canvas element id', t => {
  prepareDocument('<canvas id="canvas-id" />')
  t.is(ima('canvas-id').type, CANVAS_TYPE)
  t.is(ima('canvas-id').origin, document.getElementById('canvas-id'))
})

test('ima("unknow-id") - with unknown element id', t => {
  prepareDocument()
  t.throws(() => {
    ima('unknow-id')
  }, /Can't find the element with id "unknow-id"/)
})

function prepareDocument(content) {
  global.document = jsdom.jsdom(content).defaultView.document
}
