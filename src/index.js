import load from './load'
import resize from './prototype/resize'
import make from './prototype/make'
import {isNumber} from './utils/is-a'

const IMAGE_TYPE = 'image'
const CANVAS_TYPE = 'canvas'

function ima(selector) {
  if (!this || this.constructor !== ima) {
    return new ima(...arguments) // eslint-disable-line new-cap
  }

  if (!selector) {
    throw new TypeError('Selector is empty.')
  }

  if (typeof selector === 'string') {
    // e.g. ima('domID')
    const elem = document.getElementById(selector)

    if (!elem) {
      throw new TypeError(`Can't find the element with id "${selector}"`)
    }

    _assignElementInfo.call(this, elem)
  } else if (selector.nodeType) {
    // e.g. <ima>, <canvas>
    _assignElementInfo.call(this, selector)
  } else if (isNumber(arguments[0])) {
    // e.g. ima(100, 200)
    _assignElementInfo.call(this, ima.create(arguments[0], arguments[1]))
  } else {
    throw new TypeError('Uknown selector')
  }
}

function _assignElementInfo(elem) {
  if (elem.nodeName === 'IMG') {
    this.type = IMAGE_TYPE
    this.origin = elem
  } else if (elem.nodeName === 'CANVAS') {
    this.type = CANVAS_TYPE
    this.origin = elem
  } else {
    throw new TypeError('Initial element should be HTMLImageElement or HTMLCanvasElement')
  }
}

ima.create = (w, h) => {
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  return canvas
}

ima.prototype._getCurrent = function () {
  return this._current || this.origin
}

ima.prototype._addProcess = function (process) {
  this._processes = (this._processes || []).concat(process)
  return this._processes
}

ima.prototype._setCurrent = function (next) {
  this._current = next
}

ima.load = load
ima.prototype.resize = resize
ima.prototype.then = make
ima.prototype.do = make
ima.prototype.make = make

export default ima
