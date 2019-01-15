agent("npm") {
  checkoutScm(false)

  // Use notify-plugin to create a green/red status on Bitbucket
  bitbucketNotify("CI") {

    // 1. Install deps
      withNode("10.13.0") {
        stage("Install") {

            sh 'npm run install:yarn'
            sh './node_modules/.bin/yarn --link-duplicates --production'
          }
        }

    // 2. Run CI Steps (build, test, lint etc)
    stage("CI") {
        sh './bin/jenkins'
    }
  }
}
