console.log(`❤️  lint-staged\n`)

module.exports = {
  "*.{ts,tsx,js,jsx,json,md,html,css}": [
    "yarn fix",
    "git add"
  ]
}
