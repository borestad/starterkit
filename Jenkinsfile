agent("npm") {
  checkoutScm(false)

  // Use notify-plugin to create a green/red status on Bitbucket
  bitbucketNotify("CI") {

    // 1. Install deps
    stage("Install") {
      withNode("10.13.0") {
        sh 'NODE_ENV=production .starterkit/bin/install-all'
      }
    }

    // 2. Run CI Steps (build, test, lint etc)
    stage("CI") {
      withNode("10.13.0") {
        sh '.starterkit/bin/ci'
      }
    }
  }
}

// For creating a custom Docker Container - See:
// https://git.netent.com/projects/REL/repos/games-release-train-akamai-docker/browse/Dockerfile

// Syntax: https://jenkins.io/doc/book/pipeline/docker/

// pipeline {
//     agent {
//         docker {
//           image 'node:7-alpine'
//           label 'npm'
//         }
//     }
//     stages {
//         stage('Test') {
//             steps {
//                 // Inside Docker Container
//                 sh 'ls -la'
//                 sh 'node --version'
//             }
//         }
//     }
// }