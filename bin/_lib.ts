import chalk from 'chalk'
import * as execa from 'execa'
import { kebabCase } from 'lodash'
import * as path from 'path'

const { log } = console

// tslint:disable-next-line: no-empty
const noop = () => {}

export const ROOT = path.join(__dirname, '..')

export const exec = async (cmd: string) => {
  return execa.shell(cmd.trim(), {
    stdio: 'inherit'
  })
}

export const onError = e => {
  console.error(`\n${chalk.red(e)}\n`)
  process.exit(e.code || 1)
}

export const onSuccess = noop

export const run = (fn: Function): any[] => {
  log(chalk.underline.yellow(kebabCase(fn.name)))
  return fn()
    .then(onSuccess)
    .catch(onError)
}
