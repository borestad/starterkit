#!/usr/bin/env npx ts-node -T

import { remove } from 'fs-extra'
import { exec, ROOT, run } from './_lib'

/**
 * PostInstall
 * Runs after yarn is finished
 */
run(async function postInstall () {
  return Promise.all([
    exec(`git config --local include.path ../.gitconfig`),
    remove(`${ROOT}/package-lock.json`),
    exec(`node ${ROOT}/node_modules/husky/husky.js install`)
  ])
})
