#!/usr/bin/env node_modules/.bin/ts-node -T

// tslint:disable no-floating-promises

// import exec from 'execa'
import * as fs from 'fs-extra'
import path from 'path'

// const run = exec.shell
// const ROOT = path.join(__dirname, '..')
const cwd = process.cwd()

const removeDeps = (json, key, keep = [] as any) => {
  if (json[key]) {
    for (const prop in json[key]) {
      if (!keep.includes(prop)) {
        delete json[key][prop]
      }
    }
  }
}

; (async () => {
  try {
    const [from, to] = [`${cwd}/package.json`, `${cwd}/dist/package.json`]

    await fs.copy(`${cwd}/package.json`, `${cwd}/dist/package.json`)
    const pkg = JSON.parse(await fs.readFile('dist/package.json', 'utf-8'))

    const pkg2 = {
      name: pkg.name,
      version: pkg.version,
      licence: pkg.licence,
      author: pkg.author,
      description: pkg.description,
      main: './dist/' + path.basename(pkg.name) + '.umd.js',
      module: './dist/' + path.basename(pkg.name) + '.es5.js',
      types: './index.d.ts',
      files: pkg.files
    }

    await fs.writeFile('dist/package.json', JSON.stringify(pkg2, null, 2))
  } catch (e) {
    console.log('Error', e)
  }
})()
