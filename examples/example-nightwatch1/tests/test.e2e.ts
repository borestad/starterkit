import { NightwatchBrowser } from 'nightwatch'

export = {
  '@disabled': false,
  'Launch Babylon chibirex': (browser: NightwatchBrowser) => {
    browser
      .url('https://www.babylonjs.com/demos/actions/')
      .waitForElementNotPresent('#babylonjsLoadingDiv', 30000)
      .waitForElementPresent('#renderCanvas', 30000)
      .end()
  }
}
