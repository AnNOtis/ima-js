export function isFile(value) {
  return Object.prototype.toString.call(value) === '[object File]'
}

export function isBlob(value) {
  return Object.prototype.toString.call(value) === '[object Blob]'
}
