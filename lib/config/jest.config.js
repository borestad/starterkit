/**
 *
 * https://jestjs.io/docs/en/configuration.html
 *
 */
const { yellow } = require('chalk').default
const { flattenDeep } = require('lodash')
const { isNotCI, GIT, rootPkg, pkgUpDir } = require('@starterkit/tools')

const isWatchMode = process.argv.includes('--watch')
const glob = require('glob')

if (isNotCI) {
  console.log(`\n⭐ ${yellow.underline('<root>/config/jest.config.js')}\n`)
}

// Only look for projects that contains a `jest.config.js`
const projects = flattenDeep(
  rootPkg('workspaces')
    .map(GIT.fromGitRoot)
    .map(x => glob.sync(`${x}/jest.config.js`))
).map(pkgUpDir)

module.exports = {
  rootDir: GIT.ROOT,
  testEnvironment: 'node',
  projects,
  bail: true,
  silent: false,
  collectCoverage: !isWatchMode,
  verbose: isNotCI,
  testMatch: ['<rootDir>/**/*.test.ts'],
  moduleFileExtensions: ['js', 'json', 'jsx', 'node', 'ts', 'tsx'],
  coverageDirectory: '<rootDir>/node_modules/.tmp/coverage',
  coverageReporters: ['text', 'text-summary'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!/**/*.d.ts', '!/dist/**'],
  modulePathIgnorePatterns: ['node_modules', '..*']
}
