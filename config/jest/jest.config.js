/**
 *
 * https://jestjs.io/docs/en/configuration.html
 *
 */
const { yellow } = require('chalk')
const { isNotCI, gitRoot, rootPkg } = require('@config/helpers-cli')

if (isNotCI) {
  console.log(`\n⭐ ${yellow.underline('<root>/config/jest.config.js')}\n`)
}

const projects = rootPkg().workspaces.map(p => `<rootDir>/${p}`)
console.log(projects)

module.exports = {
  rootDir: gitRoot(),
  testEnvironment: 'node',
  projects: [
    '<rootDir>/examples/*',
    '<rootDir>/packages/*',
    '<rootDir>/config/*'
  ],
  // projects,
  bail: true,
  silent: false,
  collectCoverage: true,
  verbose: isNotCI,
  moduleFileExtensions: ['js', 'json', 'jsx', 'node', 'ts', 'tsx'],
  coverageDirectory: '<rootDir>/node_modules/.tmp/coverage',
  coverageReporters: ['text', 'text-summary'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!/**/*.d.ts', '!/dist/**'],
  modulePathIgnorePatterns: ['**/node_modules/**']
}
