/**
 *
 * https://jestjs.io/docs/en/configuration.html
 *
 */
const { yellow } = require('chalk')
const { isNotCI, GIT, rootPkg } = require('@config/cli-tools')
const isWatchMode = process.argv.includes('--watch')

if (isNotCI) {
  console.log(`\n⭐ ${yellow.underline('<root>/config/jest.config.js')}\n`)
}

module.exports = {
  rootDir: GIT.ROOT,
  testEnvironment: 'node',
  projects: rootPkg('workspaces').map(p => `<rootDir>/${p}`),
  bail: true,
  silent: false,
  collectCoverage: !isWatchMode,
  verbose: isNotCI,
  moduleFileExtensions: ['js', 'json', 'jsx', 'node', 'ts', 'tsx'],
  coverageDirectory: '<rootDir>/node_modules/.tmp/coverage',
  coverageReporters: ['text', 'text-summary'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!/**/*.d.ts', '!/dist/**'],
  modulePathIgnorePatterns: ['node_modules', '..*']
}
