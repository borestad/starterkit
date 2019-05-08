/**
 *
 * https://babeljs.io/docs/en/config-files
 *
 */

require('ts-node').register({
  /* options */
  transpileOnly: true,
  typeCheck: false,
  compilerOptions: {
    module: 'commonjs'
  }
})

module.exports = require('@starterkit/config/babel.config')
