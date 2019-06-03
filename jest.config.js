/**
 * Jest Root/Project configuration (extends from starterkit)
 *
 * Used from the root to speedup builds
 *
 * https://jestjs.io/docs/en/configuration.html
 * https://kulshekhar.github.io/ts-jest/user/config/#jest-preset
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

module.exports = require('@netent/starterkit/config/jest.config.root').default
