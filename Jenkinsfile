agent("npm") {
  checkoutScm(false)

  // Use notify-plugin to create a green/red status on Bitbucket
  bitbucketNotify("CI") {

    // 1. Install deps
    stage("Install") {
      withNode("10.13.0") {
        sh 'npm config ls'
        sh 'npm run install:yarn'
        sh './node_modules/.bin/yarn --link-duplicates --production'
        sh 'npm config ls'
      }
    }

    // 2. Run CI Steps (build, test, lint etc)
    stage("CI") {
      withNode("10.13.0") {
        sh """
        ./bin/jenkins
        """
      }
    }
  }
}
