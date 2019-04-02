import { NightwatchTests } from 'nightwatch'

// ============================================================================
// Setup
// ============================================================================
const PAUSE = 1000

const q = {
  searchField: 'input[type=text]'
}

// ============================================================================
// Tests
// ============================================================================
export = {
  '@disabled': false,

  'Test Google: #1': browser => {
    browser.url('https://www.google.com').waitForElementPresent('body')
  },

  'Test Google: #2': browser => {
    browser
      .setValue(q.searchField, 'rickroll')
      .keys([browser.Keys.ENTER])
      .pause(PAUSE)
      .assert.containsText('#main', 'Rick Astley')
  },

  'Test Google: #3': browser => {
    browser
      .url('https://www.google.com')
      .waitForElementVisible('body')
      .assert.title('Google')
      .assert.visible(q.searchField)
      .setValue(q.searchField, 'dolph lundgren')
      .setValue(q.searchField, browser.Keys.ENTER) // press Enter to search
      .pause(PAUSE)
      .assert.containsText('#rso a:first-child', 'Dolph Lundgren')
      .assert.containsText('#rso a:first-child', 'Wikipedia')
      // End session
      .end()
  }
} as NightwatchTests
