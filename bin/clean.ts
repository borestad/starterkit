#!/usr/bin/env npx ts-node -T

import { getIgnoredFiles } from '@config/helpers-cli'
import * as PromiseUtil from 'blend-promise-utils'
import { default as chalk } from 'chalk'
import { remove } from 'fs-extra'
import * as path from 'path'
import { run } from './_lib'
const { log } = console

const EXCLUDE = /node_modules/
const filesToDelete = getIgnoredFiles().filter(x => !EXCLUDE.test(x))

/**
 * Clean
 * Cleans the entire project:
 *  - all ignored files (.gitignore)
 *  - exclude node_modules
 */
run(async function cleanRepo () {
  if (filesToDelete.length) {
    for (const file of filesToDelete) {
      const f = path.parse(file)
      log(`Removing ${f.dir}${f.dir && '/'}${chalk.underline.yellow(f.base)}`)
    }
  } else {
    log('Nothing to do.')
  }

  await PromiseUtil.mapLimit(filesToDelete, 5, path => remove(path))
})
