require('ts-node').register({
  /* options */
  transpileOnly: true,
  typeCheck: false,
  compilerOptions: {
    module: 'commonjs'
  }
})

module.exports = require('./config/config.helpers')
