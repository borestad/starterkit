import { NightwatchBrowser } from 'nightwatch'

module.exports = {
  'Launch Babylon Yeti Scene': (browser: NightwatchBrowser) => {
    browser
      .url('https://www.babylonjs.com/demos/yeti/')
      .waitForElementNotPresent('#babylonjsLoadingDiv', 30000)
      .end()
  }
}
