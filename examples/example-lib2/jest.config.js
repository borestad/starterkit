/**
 *
 * https://jestjs.io/docs/en/configuration.html
 *
 */

require('ts-node/register/transpile-only')

module.exports = require('@netent/starterkit/config/jest.config.base')({
  pkg: require('./package.json'),
  filename: __filename
})
