/**
 *
 * https://babeljs.io/docs/en/config-files
 *
 */

const path = require('path')
const cwd = path.relative(__dirname, process.cwd())

console.log(`❤️  babel.config.js (${cwd})`)

module.exports = api => {
  const isProd = expr => api.env('production') && expr
  api.cache.using(() => process.env.NODE_ENV)

  const presets = ['@babel/env', '@babel/typescript']
  const plugins = [
    '@babel/proposal-class-properties',
    '@babel/proposal-object-rest-spread',
    isProd('babel-plugin-loop-optimizer')
  ].filter(Boolean)

  return {
    presets,
    plugins
  }
}
