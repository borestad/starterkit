#!/usr/bin/env node_modules/.bin/ts-node -T
// tslint:disable no-floating-promises

// TODO: Validate against some tool like:
// http://package-json-validator.com/

import * as fs from 'fs-extra'
import { isNil, pickBy, times } from 'lodash'
import path from 'path'

const { log, error } = console
const cwd = process.cwd()
; (async () => {
  try {
    const [from, to] = [`${cwd}/package.json`, `${cwd}/dist/package.json`]

    await fs.copy(from, to)

    const pkg = JSON.parse(await fs.readFile(to, 'utf-8'))

    const output = {
      name: pkg.name,
      description: pkg.description,
      version: pkg.version,
      license: pkg.license,
      author: pkg.author,
      maintainers: pkg.maintainers,
      bugs: pkg.bugs,
      homepage: pkg.homepage,
      main: `dist/${path.basename(pkg.name)}.umd.js`,
      module: `dist/${path.basename(pkg.name)}.es5.js`,
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

    await fs.writeFile(to, JSON.stringify(output, null, 2))
  } catch (e) {
    log(e)
  }
})()
