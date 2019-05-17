/**
 *
 * https://jestjs.io/docs/en/configuration.html
 * https://kulshekhar.github.io/ts-jest/user/config/#jest-preset
 *
 */
import { flattenDeep } from 'lodash'
import glob from 'glob'
import chalk from 'chalk'
import { Config } from '@jest/types'
import { isNotCI, GIT, rootPkg, pkgUpDir } from '../tools'

const { yellow } = chalk
const isWatchMode = process.argv.includes('--watch')

if (isNotCI) {
  console.log(`\n⭐ ${yellow.underline('<root>/config/jest.config.js')}\n`)
}

// Only look for projects that contains a `jest.config.js`
const projects = flattenDeep(
  (rootPkg('workspaces') as string[])
    .map(GIT.fromGitRoot)
    .map(x => glob.sync(`${x}/jest.config.js`))
).map(x => pkgUpDir(x))

const config: Config.InitialOptions = {
  // preset: 'ts-jest/presets/js-with-ts',
  rootDir: GIT.ROOT,
  testEnvironment: 'node',
  projects,
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
