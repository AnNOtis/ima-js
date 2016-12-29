const {isFile, isBlob} = require('./utils/is-a')

function load(imageResource, options = {}) {
  if (!imageResource) {
    throw new TypeError('ima.load(resource) - Need to specify a resource.')
  }

  if (typeof imageResource === 'string') {
    return new Promise((resolve, reject) => buildImage(imageResource, resolve, reject, options))
  } else if (isFile(imageResource) || isBlob(imageResource)) {
    return new Promise((resolve, reject) => {
      readFile(
        imageResource,
        fileUrl => buildImage(fileUrl, resolve, reject),
        reject
      )
    })
  }

  throw new TypeError(
    'ima.load(resource) - Resource should be type of File, Blob, or image URL.'
  )
}

function buildImage(source, onLoad, onError, options) {
  const image = document.createElement('img')
  image.onerror = onError
  image.onload = () => onLoad(image)
  if (options.crossOrigin) {
    image.crossOrigin = options.crossOrigin
  }
  image.src = source
}

function readFile(file, onLoad, onError) {
  const createObjectURL =
    window.createObjectURL ||
    (window.URL && URL.createObjectURL) ||
    (window.webkitURL && window.webkitURL.createObjectURL)

  if (createObjectURL) {
    onLoad(createObjectURL(File))
  } else if (window.FileReader) {
    const reader = new FileReader()
    reader.onload = () => onLoad(reader.result)
    reader.onerror = onError
    reader.readAsDataURL(file)
  } else {
    onError(new Error('File API not support.'))
  }
}

module.exports = load
