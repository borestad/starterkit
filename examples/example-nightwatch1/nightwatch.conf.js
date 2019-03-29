const chromium = require('chromium')

module.exports = {
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
          args: ['headless', '--no-sandbox'],
          binary: chromium.path
        }
      }
    }
  }
}
