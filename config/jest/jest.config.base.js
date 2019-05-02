/**
 *
 * https://jestjs.io/docs/en/configuration.html
 *
 */
const { gray } = require('chalk')
const { isNotCI, GIT } = require('@config/cli-tools')
const { log } = console

// Create some spacing for readability
setImmediate(log)

module.exports = options => {
  const { pkg, filename } = options
  if (isNotCI) {
    log(`★  ${gray.underline(GIT.relativeToGitRoot(filename))}`)
  }

  return {
    displayName: pkg.name,
    name: pkg.name,
    transform: {
      '^.+\\.tsx?$': 'ts-jest'
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts?)$',
    moduleFileExtensions: ['ts', 'js'],
    globals: {
      'ts-jest': {
        diagnostics: false,
        isolatedModules: false
      }
    },
    coverageThreshold: {
      global: {
        branches: 90,
        functions: 90,
        lines: 90,
        statements: 90
      }
    }
  }
}
