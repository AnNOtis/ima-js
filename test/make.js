import test from 'ava'
import ima from '../src/index'
import {prepareDocument} from './helpers/dom'

test.beforeEach(() => {
  prepareDocument()
})

test('image.make() - pass arguments to process', async t => {
  const image = ima(1, 1)
  image._processes = [
    (canvas, current, setResult) => {
      t.is(canvas, image._getCurrent())
      t.is(current, image)

      setResult('result')
      t.is(image._getCurrent(), 'result')
    }
  ]

  await image.make()
})

test('image.make() - get result', async t => {
  const current = 'Current result'
  const image = ima(1, 1)
  image._setCurrent(current)

  await image.make(result => t.is(result, current))
  await image.make().then(result => t.is(result, current))
})
