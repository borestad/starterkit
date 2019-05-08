const { yellow, underline } = require('chalk')
const { log } = console

/*
 * Run linters on git staged files
 * https://github.com/okonet/lint-staged
 *
 */

log(`${yellow(`⭐ ${underline('lint-staged')}`)}`)

module.exports = {
  '.gitignore': ['ts-node -T lib/bin/validate.ts'],
  '*.{json,md,html,css}': ['prettier -c --write', 'git add'],
  '*.{js,jsx,ts,tsx}': [
    'npx prettier -c --write',
    'npx eslint --ignore-path=.gitignore --fix --ext js --ext jsx --ext ts --ext tsx',
    'git add'
  ]
}
