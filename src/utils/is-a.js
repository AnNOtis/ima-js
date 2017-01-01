export function isFile(value) {
  return _is('File')(value)
}

export function isBlob(value) {
  return _is('Blob')(value)
}

export function isNumber(value) {
  return _is('Number')(value)
}

export function isFunc(value) {
  return _is('Function')(value)
}

function _is(type) {
  return value => Object.prototype.toString.call(value) === `[object ${type}]`
}
