agent("npm") {
  checkoutScm(false)

  // Use notify-plugin to create a green/red status on Bitbucket
  bitbucketNotify("CI") {

    // 1. Install deps
    stage("Install") {
      withNode("10.13.0") {
        sh 'set +x; npm run install:yarn'
        sh 'set +x; ./node_modules/.bin/yarn --link-duplicates'
      }
    }

    // 2. Run CI Steps (build, test, lint etc)
    stage("CI") {
      withNode("10.13.0") {
        sh 'set +x; ./bin/jenkins'
      }
    }
  }
}
