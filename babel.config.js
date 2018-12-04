/**
 *
 * https://babeljs.io/docs/en/config-files
 *
 */

console.log('❤️ babel.config.js')

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
