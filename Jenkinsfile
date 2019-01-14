agent("npm") {
  checkoutScm(false)

  // Use notify-plugin to create a green/red status on Bitbucket
  bitbucketNotify("CI") {

    // 1. Install deps
    stage("Install") {
      withNode("10.13.0") {
        sh 'npm run install:yarn'
        sh './node_modules/.bin/yarn --link-duplicates --production'
      }
    }

    // 2. Run CI Steps (build, test, lint etc)
    stage("CI") {
      withNode("10.13.0") {
        sh 'ARTIFACTORY_NPM_REGISTRY=https://artifactory.netent.com/artifactory/api/npm/npm-virtual ./node_modules/.bin/yarn ci'
      }
    }
  }
}