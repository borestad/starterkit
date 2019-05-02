/**
 *
 * https://babeljs.io/docs/en/config-files
 *
 */

const { isNotCI } = require('@config/cli-tools')
const { yellow } = require('chalk')
const cwd = require('path').relative(__dirname, process.cwd())

if (isNotCI) {
  console.log(`\n⭐ ${yellow.underline('babel.config.js')} [${cwd}]\n`)
}

module.exports = api => {
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
