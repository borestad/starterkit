#!/usr/bin/env node

/**
 * Command Line Utilities
 */

/* eslint-disable @typescript-eslint/no-use-before-define */
import * as path from 'path'
import chalk from 'chalk'
import execa from 'execa'
import * as fs from 'fs-extra'
import _isCI from 'is-ci'
import { compact, isString, kebabCase, memoize, noop } from 'lodash'
import * as _pkgUp from 'pkg-up'

const { log } = console

const str2Array = (str: string) => {
  return compact(str.split('\n'))
}

/**
 * Returns Boolean if environment is NOT run on a CI-environment
 */
export const isCI = Boolean(_isCI)

export const isNotCI = !isCI

// export async function exec(cmd: string, options?: execa.Options) {
export async function exec(cmd: string, options?: execa.Options) {
  return execa.shell(cmd.trim(), Object.assign({ stdio: 'inherit' }, options))
}

/**
 * Generic onError / Exit handler
 */
export function onError(e) {
  console.error(`\n${chalk.red(e)}\n`)
  process.exit(e.code || 1)
}

/**
 * Generic onSuccess handler
 */
export const onSuccess = noop

/**
 * Run handler
 */
export const run = (fn: Function) => {
  const text = chalk.underline.yellow
  log()
  log(`=== ${text(kebabCase(`${fn.name}`).toUpperCase())} ===`)
  log()

  return fn()
    .then(onSuccess)
    .catch(onError)
}

/**
 * Returns a HOC exec function
 */
export const execFn = (cmd: string) => () => {
  return execa.shellSync(cmd.trim()).stdout
}

/**
 * Returns a memoized exec function
 */
export const mexec = (cmd: TemplateStringsArray) => {
  return memoize(execFn(cmd[0]))
}

/**
 * Returns a normalized relative path
 */
export const relativeFrom = ({ from, to }) => {
  return path.normalize(path.relative(from, to))
}

/**
 * Returns content of <gitRoot>/package.json
 */
export const rootPkg = (prop?: string) => {
  const json = fs.readJSONSync(pkgUp(GIT.ROOT))
  return prop ? json[prop] : json
}

/**
 * Find the closest package.json file from path
 * @param {*} path
 */
export const pkgUp = (cwd: string) => {
  return _pkgUp.sync({ cwd }) || path.join(GIT.ROOT, 'package.json')
}

/**
 * Find the directory with closest package.json file from path
 * @param {*} path
 */
export const pkgUpDir = (cwd: string) => {
  return path.parse(pkgUp(cwd)).dir
}

export const br = (lines = 1) => {
  Array.from(new Array(lines)).forEach(() => console.log())
}
// ----------------------------------------------------------------------------
// GIT
// ----------------------------------------------------------------------------

const _gitRoot = mexec` git rev-parse --show-toplevel`
const _gitCurrentBranch = mexec` git symbolic-ref --short HEAD`
const _gitShortHash = mexec` git rev-parse --short HEAD`

export const GIT = {
  /**
   * Returns the git root absolute path
   */
  get ROOT() {
    return _gitRoot()
  },

  /**
   * Returns the current branch
   */
  get CURRENT_BRANCH() {
    return _gitCurrentBranch()
  },

  /**
   * Returns the current commit short hash
   */
  get SHORTHASH() {
    return _gitShortHash()
  },

  /**
   * Returns an array of ignored files still in index
   */
  get IGNORED_FILES_STILL_IN_INDEX() {
    return str2Array(mexec` git ls-files --ignored --exclude-standard`())
  },

  /**
   * Returns an array of ignored files
   */
  get IGNORED_FILES() {
    return str2Array(
      mexec` git ls-files --directory --others --exclude-standard --ignored`()
    )
  },

  /**
   * Returns an relative path from git-root
   */
  relativeFromGitRoot(from: string) {
    return relativeFrom({ from, to: GIT.ROOT })
  },

  /**
   * Returns an absolute path from git-root
   */
  fromGitRoot(...args: any[]) {
    return path.normalize(path.resolve(GIT.ROOT, ...args.filter(isString)))
  },

  /**
   * Returns an relative path to git-root
   */
  relativeToGitRoot(to: string) {
    return relativeFrom({ to, from: GIT.ROOT })
  }
}
