import { NightwatchBrowser } from 'nightwatch'

export = {
  '@disabled': false,
  'Launch Babylon chibirex': (browser: NightwatchBrowser) => {
    browser
      .url('https://www.babylonjs.com/demos/actions/')
      .waitForElementNotPresent('#babylonjsLoadingDiv')
      .waitForElementPresent('#renderCanvas')
      .end()
  }
}
