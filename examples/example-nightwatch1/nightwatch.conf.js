/* eslint-disable @typescript-eslint/camelcase */
const chromium = (process.env.CHROMIUM_BIN = require('puppeteer').executablePath())
const path = require('path')
const fs = require('fs')
const JSON5 = require('json5')

const dist = JSON5.parse(fs.readFileSync('./tsconfig.json', 'utf-8'))
  .compilerOptions.outDir

const ln = '-'.repeat(80)
const { log } = console

const settings = {
  src_folders: [path.join(dist, 'tests')],
  output_folder: 'reports',
  globals_path: path.join(dist, 'globals.js'),
  test_workers: false,
  selenium: {
    start_process: false
  },
  test_settings: {
    default: {
      selenium_port: 9515,
      selenium_host: 'localhost',
      default_path_prefix: '',
      desiredCapabilities: {
        acceptSslCerts: true,
        browserName: 'chromium',
        chromeOptions: {
          args: [
            '--headless',
            '--no-sandbox',
            '--ignore-certificate-errors',
            '--enable-logging=v=1'
          ],
          binary: chromium
        }
      }
    }
  }
}

log(ln)
log(
  `Browser: ${settings.test_settings.default.desiredCapabilities.browserName}`
)
log(`Path:    ${chromium}`)
log(ln)

module.exports = settings
