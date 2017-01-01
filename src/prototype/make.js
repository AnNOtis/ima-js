import {isFunc} from '../utils/is-a'

function make(cb) {
  const that = this
  const setCurrent = that._setCurrent.bind(that)

  return new Promise(resolve => {
    if (that._processes && that._processes.length > 0) {
      for (let i = 0; i < that._processes.length; i++) {
        that._processes[i](that._getCurrent(), that, setCurrent)
      }
    }

    const result = that._getCurrent()
    if (isFunc(cb)) {
      resolve(cb(result))
    } else {
      resolve(result)
    }
  })
}

export default make
