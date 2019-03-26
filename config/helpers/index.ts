import * as execa from 'execa'
import { memoize } from 'lodash'
import path from 'path'

// Privates
// ----------------------------------------------------------------------------
const exec = (str: string) => () => execa.shellSync(str.trim()).stdout
const mexec = (str: TemplateStringsArray) => memoize(exec(str[0]))

// Publics
// ----------------------------------------------------------------------------
export const gitRoot = mexec`
  git rev-parse --show-toplevel
`

export const gitShortHash = mexec`
  git rev-parse --short HEAD
`

export const pathRoot = (...args: string[]) => {
  return path.join(gitRoot(), ...args)
}
