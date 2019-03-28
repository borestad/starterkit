import { NightwatchTests } from 'nightwatch'

// ============================================================================
// Setup
// ============================================================================

const q = {
  searchField: 'input[type=text]'
}

// ============================================================================
// Tests
// ============================================================================
export = {
  '@disabled': false,

  'Test Google: #1': browser => {
    browser.url('https://www.google.com').waitForElementPresent('body', 30000)
  },

  'Test Google: #2': browser => {
    browser
      .setValue(q.searchField, 'rickroll')
      .keys([browser.Keys.ENTER])
      .pause(30000)
      .assert.containsText('#main', 'Rick Astley')
  },

  'Test Google: #3': browser => {
    browser
      .url('https://www.google.com')
      .waitForElementVisible('body', 30000)
      .assert.title('Google')
      .assert.visible(q.searchField)
      .setValue(q.searchField, 'dolph lundgren')
      .setValue(q.searchField, browser.Keys.ENTER) // press Enter to search
      .pause(30000)
      .assert.containsText(
        '#rso a:first-child',
        'Dolph Lundgren – Wikipedia',
        'Dolph not found!'
      )
      // End session
      .end()
  }
} as NightwatchTests
