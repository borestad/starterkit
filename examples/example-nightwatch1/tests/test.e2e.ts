import { NightwatchBrowser } from 'nightwatch'

export = {
  'Launch Babylon chibirex demo': (browser: NightwatchBrowser) => {
    browser
      .url('https://www.babylonjs.com/demos/chibirex/')
      .waitForElementNotPresent('#babylonjsLoadingDiv', 30000)
      .end()
  }
}
