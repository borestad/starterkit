/**
 *
 * https://jestjs.io/docs/en/configuration.html
 *
 */
const { yellow } = require('chalk')
const { isNotCI, gitRoot, rootPkg } = require('@config/helpers-cli')
const isWatchMode = process.argv.includes('--watch')

if (isNotCI) {
  console.log(`\n⭐ ${yellow.underline('<root>/config/jest.config.js')}\n`)
}

module.exports = {
  rootDir: gitRoot(),
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
