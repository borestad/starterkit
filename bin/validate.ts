#!/usr/bin/env npx ts-node -T

import { GIT, run } from '@config/cli-tools'
import { tick } from 'figures'
import { isEmpty } from 'lodash'
import * as util from 'util'
const { log } = console

let result: any

/**
 * Validate if files are ignored
 */



 

run(async function sanityCheck () {
  if (isEmpty((result = GIT.IGNORED_FILES_STILL_IN_INDEX))) {
    log(`${tick} ️Validating ignored files`)
  } else {
    throw new Error(
      util.format(
        `
        There exists committed files in this repository that are ignored by git.
        This usually happens when files are beeing added to .gitignore before deleting them.


        This can cause a lot of unwanted side effects - Please remove them!
        https://www.google.com/search?q=delete+files+still+in+in+gitignore
        \n%s`,
        JSON.stringify(result, null, 4)
      )
    )
  }
})
