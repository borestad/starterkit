/*
* Git hooks
* https://github.com/typicode/husky
*
* Full list of available hooks:
* https://githooks.com/
*/

console.log(`❤️  husky\n`)

module.exports = {
  hooks: {
    "pre-commit": "lint-staged -c .lintstagedrc.js",
    "post-commit": "git update-index --again"
  }
}
