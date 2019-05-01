const { yellow, underline } = require('chalk')
const { log } = console

/*
 * Run linters on git staged files
 * https://github.com/okonet/lint-staged
 *
 */

log(`${yellow(`⭐ ${underline('lint-staged')}`)}`)

module.exports = {
  '*.*': ['node -r esm bin/validate'],
  '*.{json,md,html,css}': ['prettier -c --write', 'git add'],
  '*.{js,jsx}': [
    'prettier -c --write',
    'eslint --ignore-path=.gitignore --fix',
    'git add'
  ],
  '*.{ts,tsx}': [
    'prettier -c --write',
    'tslint -c tslint.json --fix -t codeFrame',
    'git add'
  ]
}
