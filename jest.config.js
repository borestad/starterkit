// const { defaults } = require('jest-config')

module.exports = {
  testEnvironment: 'node',
  projects: ['<rootDir>/examples/*'],
  bail: true,
  silent: false,
  verbose: false,
  moduleFileExtensions: ['js', 'json', 'jsx', 'node', 'ts', 'tsx'],
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'text', 'text-summary'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!/**/*.d.ts', '!/dist/**'],
  modulePathIgnorePatterns: ['/node_modules/', '<rootDir>/.*dist']
}
