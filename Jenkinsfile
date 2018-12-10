agent("npm") {
  checkoutScm(false)

  bitbucketNotify("CI") {
    stage("Install") {
      withNode("10.13.0") {
        sh 'npm run install:yarn'
        sh './node_modules/.bin/yarn --link-duplicates --production'
      }
    }

    stage("Test") {
      withNode("10.13.0") {
        sh './node_modules/.bin/yarn ci'
      }
    }
  }
}