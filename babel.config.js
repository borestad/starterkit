// ========================================================================
//  💥 Project-wide (root) configuration for Babel
//
//    Documentation:
//
//    https://babeljs.io/docs/en/config-files
//    https://new.babeljs.io/docs/en/next/babelconfigjs.html
//
// ========================================================================

// eslint-disable-next-line import/no-extraneous-dependencies
require('ts-node').register({
  /* options */
  transpileOnly: true,
  typeCheck: false,
  compilerOptions: {
    module: 'commonjs'
  }
})

module.exports = require('@netent/starterkit/config/config.babel')
