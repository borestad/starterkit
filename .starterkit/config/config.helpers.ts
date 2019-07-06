#!/usr/bin/env node

/**
 * Command Line Utilities
 */

import * as path from 'path'
import chalk from 'chalk'
import execa from 'execa'
import * as fs from 'fs-extra'
import _isCI from 'is-ci'
import { compact, isString, kebabCase, once, noop, times } from 'lodash'
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

  br()
  log(`=== ${text(kebabCase(`${fn.name}`).toUpperCase())} ===`)
  br()

  return fn()
    .then(onSuccess)
    .catch(onError)
}

type CmdArguments = string | TemplateStringsArray

export const args2str = (args: CmdArguments): string => {
  return (args['map'] ? args[0] : args.toString()).trim()
}

export async function exec(args: CmdArguments, opts?: execa.Options) {
  opts = { ...{ stdio: 'inherit' }, ...opts }
  return execa.command(args2str(args), opts)
}

/**
 * Returns a HOC exec function
 */
export const execFn = (args: CmdArguments) => () => {
  return execa.commandSync(args2str(args)).stdout.toString()
}

/**
 * Returns a exec that only runs once
 */
export const execFnOnce = (cmd: TemplateStringsArray) => {
  return once(execFn(cmd))
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
 */
export const pkgUp = (cwd: string) => {
  return _pkgUp.sync({ cwd }) || path.join(GIT.ROOT, 'package.json')
}

/**
 * Find the directory with closest package.json file from path
 */
export const pkgUpDir = (cwd: string) => {
  return path.parse(pkgUp(cwd)).dir
}

/**
 * Creates n number of linebreaks
 */
export const br = (lines = 1) => {
  times(lines, () => console.log())
}

/**
 * Formats a Date to a readable string like: "2019-07-02 13:45"
 */
export const time = (d = new Date()) => {
  const format = (x: number) => x.toString().padStart(2, '0')

  const [year, month, date, hours, minutes] = [
    d.getFullYear(),
    d.getMonth() + 1,
    d.getDate(),
    d.getHours(),
    d.getMinutes()
  ].map(format)

  return `${year}-${month}-${date} ${hours}:${minutes}`
}

// ----------------------------------------------------------------------------
// GIT
// ----------------------------------------------------------------------------

const _gitRoot = execFnOnce` git rev-parse --show-toplevel`
const _gitCurrentBranch = execFnOnce` git symbolic-ref --short HEAD`
const _gitShortHash = execFnOnce` git rev-parse --short HEAD`

class GitHelper {
  /**
   * Returns the git root absolute path
   */
  get ROOT() {
    return _gitRoot()
  }

  /**
   * Returns the current branch
   */
  get CURRENT_BRANCH() {
    return _gitCurrentBranch()
  }

  /**
   * Returns the current commit short hash
   */
  get SHORTHASH() {
    return _gitShortHash()
  }

  /**
   * Returns an array of ignored files still in index
   */
  get IGNORED_FILES_STILL_IN_INDEX() {
    return str2Array(execFn` git ls-files --ignored --exclude-standard`())
  }

  /**
   * Returns an array of ignored files
   */
  get IGNORED_FILES() {
    return str2Array(execFn` git ls-files --directory --others --exclude-standard --ignored`())
  }

  /**
   * Returns an relative path from git-root
   */
  relativeFromGitRoot(from: string) {
    return relativeFrom({ from, to: GIT.ROOT })
  }

  /**
   * Returns an absolute path from git-root
   */
  fromGitRoot(...args: any[]) {
    return path.normalize(path.resolve(GIT.ROOT, ...args.filter(isString)))
  }

  /**
   * Returns an relative path to git-root
   */
  relativeToGitRoot(to: string) {
    return relativeFrom({ to, from: GIT.ROOT })
  }

  /**
   * Returns last commit date
   */
  lastCommitDate() {
    return time(new Date(execFn` git log -1 --format=%cd`()))
  }

  /**
   * Returns last commit author
   */
  lastCommitAuthor() {
    return execFn` git log -1 --format=%an`()
  }

  /**
   * Returns last commit message
   */
  lastCommitMessage() {
    return execFn` git log -1 --format=%B`()
  }
}

export const GIT = new GitHelper()
