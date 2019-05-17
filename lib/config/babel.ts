/**
 *
 * https://babeljs.io/docs/en/config-files
 *
 */

import * as path from 'path'
import chalk from 'chalk'
import { isNotCI } from '../tools'

const cwd = path.relative(__dirname, process.cwd())
const { yellow } = chalk

if (isNotCI) {
  console.log(`⭐ ${yellow.underline('babel.config.js')} [${cwd}]`)
}

export default api => {
  const isProd = expr => api.env('production') && expr
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
    presets,
    plugins
  }
}
