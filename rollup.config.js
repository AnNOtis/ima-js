import babel from 'rollup-plugin-babel'

export default {
  entry: 'src/index.js',
  dest: 'dist/ima.js',
  format: 'umd',
  sourceMap: 'inline',
  moduleName: 'ima',
  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
  ]
}
