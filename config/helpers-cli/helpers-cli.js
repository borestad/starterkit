const execa = require('execa')
const { memoize } = require('lodash')
const path = require('path')

// Privates
// ----------------------------------------------------------------------------
const exec = str => () => execa.shellSync(str.trim()).stdout
const mexec = str => memoize(exec(str[0]))

// Publics
// ----------------------------------------------------------------------------

const gitRoot = mexec`
  git rev-parse --show-toplevel
`

const gitShortHash = mexec`
  git rev-parse --short HEAD
`

const pathRoot = (...args) => {
  return path.join(gitRoot(), ...args)
}

module.exports = {
  gitRoot,
  gitShortHash,
  pathRoot
}
