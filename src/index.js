export const IMAGE_TYPE = 'image'
export const CANVAS_TYPE = 'canvas'

function Ima(selector) {
  if (!this || this.constructor !== Ima) {
    return new Ima(selector)
  }

  if (!selector) {
    throw new TypeError('Selector is empty.')
  }

  if (typeof selector === 'string') {
    const elem = document.getElementById(selector)

    if (!elem) {
      throw new TypeError(`Can't find the element with id "${selector}"`)
    }

    _assignElementInfo.call(this, elem)
  } else if (selector.nodeType) {
    _assignElementInfo.call(this, selector)
  } else if (typeof selector === 'object') {
    if (!selector.width || !selector.height) {
      throw new TypeError('Need to set width and height.')
    }
    _assignElementInfo.call(this, _createCanvas(selector))
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

function _createCanvas({width, height}) {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  return canvas
}

export default Ima