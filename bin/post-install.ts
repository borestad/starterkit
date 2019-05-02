#!/usr/bin/env npx ts-node -T

import { remove } from 'fs-extra'
import { exec, ROOT, run } from './_lib'

/**
 * PostInstall
 * Runs after `yarn install` is finished
 */
run(async function postInstall () {
  await exec(`git config --local include.path ../.gitconfig`)
  await remove(`${ROOT}/package-lock.json`)
  await exec(`node ${ROOT}/node_modules/husky/husky.js install`)
  await exec(`npx lerna link`)
})
