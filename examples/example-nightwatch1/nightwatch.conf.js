const chromium = require('puppeteer').executablePath()
process.env.CHROMIUM_BIN = require('puppeteer').executablePath()

const ln = '-'.repeat(80)
const { log } = console

const settings = {
  src_folders: ['dist/tests'],
  output_folder: 'reports',
  globals_path: 'dist/globals.js',
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
