#!/usr/bin/env npx ts-node -T

/**
 * PostInstall
 * Runs after yarn is finished
 */

import * as execa from 'execa'
import * as fs from 'fs-extra'
import * as path from 'path'

const ROOT = path.join(__dirname, '..')

const stream = async (cmd) => {
  return execa.shell(cmd.trim(), {
    stdio: 'inherit'
  })
}

(async function installGitHooks () {
  await stream(`git config --local include.path ../.gitconfig`)
  await fs.remove(`${ROOT}/package-lock.json`)
  await stream(`node ${ROOT}/node_modules/husky/husky.js install`)
})().catch(err => process.exit(err.code))
