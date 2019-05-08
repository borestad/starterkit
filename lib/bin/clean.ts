#!/usr/bin/env node

import { GIT, run } from '@starterkit/tools'
import * as PromiseUtil from 'blend-promise-utils'
import chalk from 'chalk'
import { remove } from 'fs-extra'
import { isEmpty } from 'lodash'
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
run(async function cleanRepo() {
  if (isEmpty(filesToDelete)) {
    return log('Nothing to do.')
  }

  if (EXCLUDE.test(process.cwd())) {
    log(`Warning!\n`)
    log(`You seem to be running "clean" _inside_ node_modules`)
    log('This script should be run from a package root to avoid side effects')
    log(`\nExiting`)
    return process.exit(1)
  }

  filesToDelete.map(path.parse).forEach(({ dir, base }) => {
    log(`Removing: ${dir}${dir && '/'}${chalk.underline.yellow(base)}`)
  })

  return PromiseUtil.mapLimit(filesToDelete, 5, path => remove(path))
})
