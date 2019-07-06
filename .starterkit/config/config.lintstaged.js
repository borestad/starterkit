/*
 * Run linters on git staged files (@starterkit)
 * https://github.com/okonet/lint-staged
 *
 */

const { yellow, underline } = require('chalk').default

console.log(`${yellow(`⭐ ${underline('lint-staged')}`)}`)

module.exports = {
  '.gitignore': ['node node_modules/@netent/starterkit/bin/validate'],
  '*.{json,md,html,css}': ['prettier -c --write', 'git add'],
  '*.{js,jsx,ts,tsx}': ['npx eslint --fix --ext .js,.jsx,.ts,.tsx --cache', 'git add']
}
