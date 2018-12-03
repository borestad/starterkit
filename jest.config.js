const { defaults } = require('jest-config')

console.log(defaults)
module.exports = {
  testEnvironment: 'node',
  projects: ['<rootDir>/examples/*'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10
    }
  },
  bail: true,
  silent: false,
  verbose: false,
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'text', 'text-summary'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!/**/*.d.ts', '!/dist/**'],
  modulePathIgnorePatterns: ['/node_modules/', '<rootDir>/.*dist']
}
