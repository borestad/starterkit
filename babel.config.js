/**
 *
 * https://babeljs.io/docs/en/config-files
 *
 */

module.exports = api => {
  api.cache(true)

  const presets = ['@babel/env', '@babel/typescript']
  const plugins = [
    '@babel/proposal-class-properties',
    '@babel/proposal-object-rest-spread'
  ]

  return {
    presets,
    plugins
  }
}
