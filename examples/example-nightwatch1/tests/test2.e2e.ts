import { NightwatchTest } from 'nightwatch'

interface E2E {
  [key: string]: NightwatchTest | boolean
}

export = {
  '@disabled': false,

  'Test Google: #1': browser => {
    browser.url('https://google.com').waitForElementPresent('body', 1000)
  },

  'Test Google: #2': browser => {
    browser
      .setValue('input[type=text]', 'rickroll')
      .keys(browser.Keys.ENTER as any)
      .pause(1000)
      .assert.containsText('#main', 'Rick Astley')
  },

  'Test Google: #3': client => {
    const field = 'input[type=text]'

    client
      .url('https://google.com')
      .waitForElementVisible('body', 1000)
      .assert.title('Google')
      .assert.visible(field)
      .setValue(field, 'dolph lundgren')
      .setValue(field, client.Keys.ENTER) // press Enter to search
      .pause(1000)
      .assert.containsText(
        '#rso a:first-child',
        'Dolph Lundgren – Wikipedia',
        'Dolph not found!'
      )
      // End session
      .end()
  }
} as E2E
