#!/usr/bin/env npx ts-node -T

import { GIT } from '@config/cli-tools'
import { isEmpty } from 'lodash'
import * as util from 'util'

let files

/**
 * Validate if files are ignored
 */
if (!isEmpty((files = GIT.IGNORED_FILES_STILL_IN_INDEX))) {
  throw new Error(
    util.format(
      `
      There exists committed files in this repository that are ignored by git.
      This usually happens when files are beeing added to .gitignore before deleting them.


      This can cause a lot of unwanted side effects - Please remove them!
      https://www.google.com/search?q=delete+files+still+in+in+gitignore
      \n%s`,
      JSON.stringify(files, null, 4)
    )
  )
}
