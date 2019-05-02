import * as chromedriver from 'chromedriver'
// import { NightwatchBrowser } from 'nightwatch'

export = {
  // this controls whether to abort the test execution when an assertion failed and skip the rest
  // it's being used in waitFor commands and expect assertions
  abortOnAssertionFailure: false,

  // this will overwrite the default polling interval (currently 500ms) for waitFor commands
  // and expect assertions that use retry
  waitForConditionPollInterval: 300,

  // default timeout value in milliseconds for waitFor commands and implicit waitFor value for
  // expect assertions
  waitForConditionTimeout: 3000,

  // this will cause waitFor commands on elements to throw an error if multiple
  // elements are found using the given locate strategy and selector
  // throwOnMultipleElementsReturned: true,

  // controls the timeout time for async hooks. Expects the done() callback to be invoked within this time
  // or an error is thrown
  asyncHookTimeout: 1000,

  before: done => {
    chromedriver.start()
    done()
  },

  after: done => {
    chromedriver.stop()
    done()
  }

  // beforeEach: (_browser: NightwatchBrowser, done) => {
  //   done()
  // },

  // afterEach: (_browser: NightwatchBrowser, done) => {
  //   done()
  // }
}
