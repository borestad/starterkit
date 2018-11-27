agent("npm") {
  stage("Install") {
    checkoutScm(false)

    withNode("10.13.0") {
      sh 'npm run install:yarn'
      sh './node_modules/.bin/yarn --link-duplicates'
    }
  }

  stage("Test") {
    withNode("10.13.0") {
      sh './node_modules/.bin/yarn ci'
    }
  }
}