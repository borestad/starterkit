/**
 * Babel Configuration (@starterkit)
 *
 * https://babeljs.io/docs/en/config-files
 *
 */

import * as path from 'path'
import chalk from 'chalk'
import { isNotCI } from '..'

const cwd = path.relative(__dirname, process.cwd())
const { yellow } = chalk

if (isNotCI) {
  console.log(`⭐ ${yellow.underline('babel.config.js')} [${cwd}]`)
}

// https://babeljs.io/docs/en/config-files#config-function-api
export default api => {
  const isProd = expr => api.env('production') && expr

  //  https://babeljs.io/docs/en/config-files#apicache
  //  Cache based on the value of NODE_ENV.
  //  Any time the using callback returns a value other than the one that was
  //  expected, the overall config function will be called again and a new entry
  //  will be added to the cache.
  api.cache.using(() => process.env.NODE_ENV)

  const presets = ['@babel/env', '@babel/typescript']
  const plugins = [
    [
      '@babel/transform-runtime',
      {
        corejs: 3,
        regenerator: true
      }
    ],
    '@babel/proposal-class-properties',
    '@babel/proposal-object-rest-spread',
    isProd('babel-plugin-loop-optimizer')
  ].filter(Boolean)

  return {
    babelrcRoots: [
      // Keep the root as a root
      '.',
      // Also consider monorepo packages "root" and load their .babelrc files.
      './packages/*',
      './examples/*'
    ],
    presets,
    plugins
  }
}
