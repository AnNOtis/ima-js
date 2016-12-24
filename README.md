# ima-js
> Image processing wrapper in browser

## Usage
```js
// load image
ima.load(file | blob | string) // => image

// init ima object
ima(<HTMLImageElement>)
ima(<HTMLCanvasElement>)
ima('#img')
ima('#canvas')
ima({width: 300, height: 300})
ima(Promise) // => Promise with one of above types

// transform
const imaObj = ima(imgElem)
imaObj.resize({width: 100, height: 100})
imaObj.resize({width: 100})
imaObj.resize({width: 100, step: 2})
imaObj.resize({width: 100, step: 'auto'})
imaObj.crop({width: 100, height: 200})
imaObj.onTo(targetImaObject, {x: 10, y: 80} | 'center' | 'contain' | 'cover' )

// evaluate
imaObj.do()

// chain
ima(ima.load('http://placehold.it/300.png'))
  .crop({width: 100, height: 100})
  .resize({width: 300, height: 300})
  .onTo(anotherCanvas, 'center')
  .do((resultCanvas) => window.open(resultCanvas.toDataURL()))
```

## API

### ima.load(File | Blob | String) -> Promise(canvas | image)
### ima() -> ima object
- HTMLImageElement
- HTMLCanvasElement
- Element ID
- {width: number, height: number}
- Promise

### imaObj.resize({})
### imaObj.crop({})
### imaObj.onto({})
### imaObj.do({})
### imaObj.then({})
### imaObj.replace({})
