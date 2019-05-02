#!/usr/bin/env npx ts-node -T

import { GIT, run } from '@config/cli-tools'
import * as PromiseUtil from 'blend-promise-utils'
import { default as chalk } from 'chalk'
import { remove } from 'fs-extra'
import * as path from 'path'
const { log } = console

const EXCLUDE = /node_modules/
const filesToDelete = GIT.IGNORED_FILES.filter(x => !EXCLUDE.test(x))

/**
 * Clean
 * Cleans the entire project:
 *  - all ignored files (.gitignore)
 *  - exclude node_modules
 */
run(async function cleanRepo () {
  if (filesToDelete.length) {
    filesToDelete.map(path.parse).forEach(({ dir, base }) => {
      log(`Removing ${dir}${dir && '/'}${chalk.underline.yellow(base)}`)
    })
    await PromiseUtil.mapLimit(filesToDelete, 5, path => remove(path))
  } else {
    log('Nothing to do.')
  }
})
