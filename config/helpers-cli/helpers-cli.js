/**
 * Command Line Utilities
 */

const execa = require('execa')
const { memoize, compact } = require('lodash')
const path = require('path')
const isCI = require('is-ci')
const fs = require('fs-extra')

const isNotCI = !isCI

/**
 * Returns a HOC exec function
 * @param {*} str
 */
const execFn = str => () => {
  return execa.shellSync(str.trim()).stdout
}

/**
 * Returns a memoized exec function
 * @param {*} str
 */
const mexec = str => {
  return memoize(execFn(str[0]))
}

/**
 * Returns the git root absolute path
 */
const gitRoot = mexec`
  git rev-parse --show-toplevel
`

/**
 * Returns the current commit short hash
 */
const gitShortHash = mexec`
  git rev-parse --short HEAD
`

/**
 * Returns an absolute path from git-root
 * @param  {...any} args
 */
const fromGitRoot = (...args) => {
  return path.normalize(path.resolve(gitRoot(), ...args))
}

/**
 * Returns an relative path to git-root
 * @param {*} str
 */
const relativeToGitRoot = from => {
  return relativeFrom({ to: gitRoot(), from })
}

/**
 * Returns an relative path from git-root
 * @param {*} str
 */
const relativeFromGitRoot = from => {
  return relativeFrom({ from, to: gitRoot() })
}

/**
 * Returns a normalized relative path
 */
const relativeFrom = ({ from, to }) => {
  return path.normalize(path.relative(from, to))
}

/**
 * Returns an array of ignored files still in index
 */
const getIgnoredFilesStillInIndex = () => {
  return compact(
    mexec`
      git ls-files --ignored --exclude-standard
  `().split('\n')
  )
}

const rootPkg = () => {
  return fs.readJSONSync(fromGitRoot('package.json'))
}

module.exports = {
  execFn,
  getIgnoredFilesStillInIndex,
  gitRoot,
  gitShortHash,
  mexec,
  fromGitRoot,
  isCI,
  isNotCI,
  relativeToGitRoot,
  relativeFrom,
  relativeFromGitRoot,
  rootPkg
}
