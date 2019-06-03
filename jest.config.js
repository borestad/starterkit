require('ts-node').register({
  /* options */
  transpileOnly: true,
  typeCheck: false,
  compilerOptions: {
    module: 'commonjs'
  }
})

module.exports = require('@netent/starterkit/config/jest.config.root').default
