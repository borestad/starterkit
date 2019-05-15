#!/usr/bin/env node

const { remove } = require('fs-extra')
const { exec, GIT, isNotCI, run } = require('@starterkit/tools')

/**
 * PostInstall
 * Runs after `yarn install` is finished
 */
run(async function postInstall() {
  // FIXME: await exec(`git lfs install`)

  await exec(`git config --local include.path ../.gitconfig`)
  await remove(`${GIT.ROOT}/package-lock.json`)
  await exec(`npx lerna link`)

  if (isNotCI) {
    await exec(`node ${GIT.ROOT}/node_modules/husky/husky.js install`)
  }
})
