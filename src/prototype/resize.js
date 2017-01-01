function resize(w, h) {
  const process = (canvas, current, output) => {
    const ima = current.constructor
    const cvs = ima.create(w, h)
    const ctx = cvs.getContext('2d')
    ctx.drawImage(canvas, 0, 0, w, h)
    output(cvs)
  }
  this._addProcess(process)
  return this
}

export default resize
