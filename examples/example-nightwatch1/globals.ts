import * as chromedriver from 'chromedriver'

export = {
  before: done => {
    chromedriver.start()
    done()
  },

  after: done => {
    chromedriver.stop()

    done()
  },

  beforeEach: (done: Function) => {
    console.log(browser)
    done()
    console.log('before each...')
  }
}
