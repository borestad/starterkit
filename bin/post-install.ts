#!/usr/bin/env npx ts-node -T

import { exec, GIT, run } from '@config/cli-tools'
import { remove } from 'fs-extra'

/**
 * PostInstall
 * Runs after `yarn install` is finished
 */
run(async function postInstall () {
  await exec(`git config --local include.path ../.gitconfig`)
  await remove(`${GIT.ROOT}/package-lock.json`)
  await exec(`node ${GIT.ROOT}/node_modules/husky/husky.js install`)
  await exec(`npx lerna link`)
})
