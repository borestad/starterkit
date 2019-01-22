import * as execa from 'execa'
import { memoize } from 'lodash'
import path from 'path'

const exec = args => () => execa.shellSync(args.trim()).stdout
const mexec = memoize(exec)

export const gitRoot = mexec(`
  git rev-parse --show-toplevel
`)

export const gitShortHash = mexec(`
  git rev-parse --short HEAD
`)

export const pathRoot = (...args) => {
  return path.join(gitRoot(), ...args)
}
