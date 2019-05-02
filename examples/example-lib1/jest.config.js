/**
 *
 * https://jestjs.io/docs/en/configuration.html
 *
 */

module.exports = require('../../config/jest/jest.config.base')({
  pkg: require('./package.json'),
  filename: __filename
})
