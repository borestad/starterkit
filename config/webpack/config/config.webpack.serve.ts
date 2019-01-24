import * as fs from 'fs'
import * as mount from 'koa-mount'
import * as Router from 'koa-router'
import * as serve from 'koa-static'
import * as os from 'os'
import * as path from 'path'
import * as webpackServeWaitpage from 'webpack-serve-waitpage'
import * as gc from '../../game.config'
import * as config from './config'

// tslint:disable-next-line:no-default-export
export default () => {
  const router = new Router()

  router.get('/game', ctx => {
    const url = gc.LOCAL_SERVER_URL

    console.log('Redirecting to:')
    console.log(url)
    ctx.redirect(url)
  })

  // https://github.com/webpack-contrib/webpack-serve
  const cfg = {
    port: gc.PORT,
    open: { path: '/game' },
    host: config.IP,
    dev: {
      stats: {
        // Add asset Information
        assets: true,

        // Add build date and time information
        builtAt: true,

        // Add information about cached (not built) modules
        cached: true,

        // Show cached assets (setting this to `false` only shows emitted files)
        cachedAssets: true,

        // Add children information
        children: false,

        // Add chunk information (setting this to `false` allows for a less verbose output)
        chunks: false,

        // `webpack --colors` equivalent
        colors: true,

        // Display the distance from the entry point for each module
        depth: false,

        // Display the entry points with the corresponding bundles
        entrypoints: false,

        // Add --env information
        env: true,

        // Add errors
        errors: true,

        // Add details to errors (like resolving log)
        errorDetails: true,

        // Add built modules information
        modules: false,

        // Show dependencies and origin of warnings/errors (since webpack 2.5.0)
        moduleTrace: true,

        // Show performance hint when file size exceeds `performance.maxAssetSize`
        performance: true,

        // Add public path information
        publicPath: true,

        // Add timing information
        timings: true,

        // Show which exports of a module are used
        usedExports: false,

        // Add webpack version information
        version: true,

        // Add warnings
        warnings: true
      }
    },
    content: [path.join(config.paths.gitRoot, 'packages')],
    add: (app, middleware, options) => {
      app.use(
        webpackServeWaitpage(options, {
          template: fs.readFileSync(
            path.join(config.paths.gitRoot, 'webpack', 'config', 'waitpage.ejs'),
            'utf8'
          )
        })
      )

      app.use(mount('/node_modules', serve(config.paths.nodeModules)))

      app.use(
        mount('/currencies', serve(path.join(config.paths.vendor, 'game-currency-formats', 'src')))
      )

      // Make sure the usage of webpack-serve-waitpage will be before the following commands if exists
      middleware.webpack()
      middleware.content()

      app.use(router.routes())
    }
  }

  return cfg
}
