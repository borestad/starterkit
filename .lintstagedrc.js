/*
 * Run linters on git staged files
 * https://github.com/okonet/lint-staged
 *
 */

console.log(`❤️  lint-staged\n`)

module.exports = {
  '*.{json,md,html,css}': ['prettier -c --write', 'git add'],
  '*.{js,jsx,ts,tsx}': ['prettier -c --write', 'yarn lint', 'git add']
}
