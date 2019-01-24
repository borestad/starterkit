// https://github.com/saibier/inferno-typescript-rollup-example/blob/master/rollup.config.js
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'

const pkg = require('./package.json')
const extensions = ['.ts', '.tsx']

export default {
  input: `src/index.ts`,
  output: [
    {
      file: 'dist/bundle.js',
      name: 'lib2',
      format: 'umd',
      sourcemap: true
    }
  ],
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  //   external: ['@scope/example-lib1'],
  //   watch: {
  //     include: 'src/**'
  //   },
  plugins: [
    resolve({
      extensions,
      browser: true
    }),

    // Allow json resolution
    // json(),
    // Compile TypeScript files with Babel
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage

    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs({
      extensions,
      include: ['node_modules/**']
    }),

    babel({
      extensions,
      include: ['/Users/johan/netent/starterkit/**/*']
      //exclude: 'foo/**'
    })

    // Resolve source maps to the original source
    // sourceMaps()
  ]
}
