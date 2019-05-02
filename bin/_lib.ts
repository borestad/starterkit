import chalk from 'chalk'
import * as execa from 'execa'
import { kebabCase } from 'lodash'
import * as path from 'path'

const { log } = console

// tslint:disable-next-line: no-empty
const noop = () => {}

export const ROOT = path.resolve(__dirname, '..')

export async function exec (cmd: string) {
  return execa.shell(cmd.trim(), {
    stdio: 'inherit'
  })
}

export function onError (e) {
  console.error(`\n${chalk.red(e)}\n`)
  process.exit(e.code || 1)
}

export const onSuccess = noop

export const run = (fn: Function) => {
  log(`\n${chalk.underline.yellow(kebabCase(fn.name))}\n`)

  return fn()
    .then(onSuccess)
    .catch(onError)
}
