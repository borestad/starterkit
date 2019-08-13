/**
 * Jest Root/Project configuration (@starterkit)
 *
 * Used from the root to speedup builds (initialized from jest.config.js)
 *
 * https://jestjs.io/docs/en/configuration.html
 * https://kulshekhar.github.io/ts-jest/user/config/#jest-preset
 *
 */

import { Config } from '@jest/types'
import chalk from 'chalk'
import { GIT, isNotCI, filterProjectWorkspacesByFile } from '..'

const { yellow } = chalk
const isWatchMode = process.argv.includes('--watch')

if (isNotCI) {
  console.log(`\n⭐ ${yellow.underline('<root>/config/jest.config.js')}\n`)
}

const config: Config.InitialOptions = {
  // preset: 'ts-jest/presets/js-with-ts',
  rootDir: GIT.ROOT,
  testEnvironment: 'node',
  projects: filterProjectWorkspacesByFile('jest.config.js'),
  bail: 1,
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

export default config
