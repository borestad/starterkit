require('ts-node').register({
  /* options */
  transpileOnly: true,
  typeCheck: false
})

module.exports = require('./cli-tools.ts')
