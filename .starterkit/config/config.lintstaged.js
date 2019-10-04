/*
 * Run linters on git staged files (@starterkit)
 * https://github.com/okonet/lint-staged
 *
 * To extend this functionality, one can also add a .lintstagedrc.js in the root folder:
 *    module.exports = require('@netent/starterkit/config/config.lintstaged')
 *
 */

const { yellow, underline } = require('chalk').default

console.log(`${yellow(`⭐ ${underline('lint-staged')}`)}`)

module.exports = {
  '.gitignore': ['npx starterkit-validate'],
  '*.lock': ['npx starterkit-validate'],
  '*.{json,md,html,css}': ['npx prettier -c --write', 'git add'],
  '*.{js,jsx,ts,tsx}': ['npx eslint --fix --ext .js,.jsx,.ts,.tsx --cache', 'git add'],
  'package.json': ['npx format-package -w', 'git add']
}
