/**
 *
 * https://jestjs.io/docs/en/configuration.html
 *
 */

module.exports = require('@starterkit/config/jest.config.base')({
  pkg: require('./package.json'),
  filename: __filename
})
