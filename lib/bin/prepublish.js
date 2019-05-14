#!/usr/bin/env npx babel-node

// TODO: Validate against some tool like:
// http://package-json-validator.com/

import { isNil, pickBy } from 'lodash'
import { run } from '@starterkit/tools'
import { copy, readFile, writeFile } from 'fs-extra'
import { basename } from 'path'

const { log, error } = console
const cwd = process.cwd()

run(async function prePublish() {
  try {
    const from = `${cwd}/package.json`
    const to = `${cwd}/dist/package.json`

    await copy(from, to)

    const pkg = JSON.parse(await readFile(to, 'utf-8'))
    const output = {
      name: pkg.name,
      description: pkg.description,
      version: pkg.version,
      license: pkg.license,
      author: pkg.author,
      maintainers: pkg.maintainers,
      bugs: pkg.bugs,
      homepage: pkg.homepage,
      main: `dist/${basename(pkg.name)}.umd.js`,
      module: `dist/${basename(pkg.name)}.es5.js`,
      types: './index.d.ts',
      files: pkg.files
    }

    if (Object.values(output).includes(undefined)) {
      log(output)
      log()
      log()

      const missing = Object.keys(pickBy(output, isNil))

      error(`Some fields within "${to}" are missing following properties:`)
      log(missing)
      log()

      throw new Error()
    } else {
      log(output)
    }

    await writeFile(to, JSON.stringify(output, null, 2))
  } catch (e) {
    log(e)
  }
})
