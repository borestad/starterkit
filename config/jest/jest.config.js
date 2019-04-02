/**
 *
 * https://jestjs.io/docs/en/configuration.html
 *
 */

console.log(`❤️  <root>/config/jest.config.js`)
const isCI = require('is-ci')

module.exports = {
  rootDir: '../../',
  testEnvironment: 'node',
  projects: ['<rootDir>/examples/*'],
  bail: true,
  silent: false,
  collectCoverage: isCI,
  verbose: !isCI,
  moduleFileExtensions: ['js', 'json', 'jsx', 'node', 'ts', 'tsx'],
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['lcov', 'text', 'text-summary'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!/**/*.d.ts', '!/dist/**'],
  modulePathIgnorePatterns: ['/node_modules/', '<rootDir>/.*dist', '**']
}
