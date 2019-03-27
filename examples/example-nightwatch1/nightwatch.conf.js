module.exports = {
  src_folders: ['dist'],
  output_folder: 'reports',
  globals_path: './globals.js',
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
        browserName: 'chrome',
        chromeOptions: {
          args: ['headless']
        }
      }
    }
  }
}
