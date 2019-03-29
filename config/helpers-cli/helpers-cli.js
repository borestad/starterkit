const execa = require('execa')
const { memoize, compact } = require('lodash')
const path = require('path')

// Privates
// ----------------------------------------------------------------------------
const exec = str => () => execa.shellSync(str.trim()).stdout
const mexec = str => memoize(exec(str[0]))

// Publics
// ----------------------------------------------------------------------------

export const gitRoot = mexec`
  git rev-parse --show-toplevel
`

export const gitShortHash = mexec`
  git rev-parse --short HEAD
`

export const pathRoot = (...args) => {
  return path.join(gitRoot(), ...args)
}

export const getIgnoredFilesStillInIndex = () => {
  return compact(
    mexec`
      git ls-files --ignored --exclude-standard
  `().split('\n')
  )
}
