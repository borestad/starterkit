#!/usr/bin/env npx ts-node -T
// tslint:disable: no-unused-expression

import { exec, GIT, isNotCI, run } from '@starterkit/tools'
import { remove } from 'fs-extra'

/**
 * PostInstall
 * Runs after `yarn install` is finished
 */
run(async function postInstall () {
  // FIXME: await exec(`git lfs install`)
  await exec(`git config --local include.path ../.gitconfig`)
  await remove(`${GIT.ROOT}/package-lock.json`)
  await exec(`npx lerna link`)

  if (isNotCI) {
    await exec(`node ${GIT.ROOT}/node_modules/husky/husky.js install`)
  }
})
