import { values } from 'lodash'
import * as webpack from 'webpack'
import * as config from './config'
import { loaders } from './config.loaders'
import { env } from './helper'

// tslint:disable-next-line:no-default-export
export default () => {
  const c: webpack.Configuration = {}

  c.context = config.paths.root

  c.target = 'web'

  c.performance = {
    hints: env.isProd() ? 'warning' : false
  }

  c.bail = true

  // https://webpack.js.org/configuration/output/
  c.output = {
    // necessary for HMR to know where to load the hot update chunks
    publicPath: '',
    path: config.paths.dist,
    library: 'Package',
    pathinfo: false
    // Point sourcemap entries to original disk location (format as URL on Windows)
    // devtoolModuleFilenameTemplate: info =>
    //   path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')
  }

  c.resolve = {
    extensions: [
      '.mjs',
      '.web.ts',
      '.ts',
      '.web.tsx',
      '.tsx',
      '.web.js',
      '.js',
      '.json',
      '.web.jsx',
      '.jsx'
    ]
  }

  c.module = {
    rules: values(loaders)
  }
  // https://webpack.js.org/configuration/stats/
  // stats = 'normal'

  c.plugins = [
    // new webpack.DefinePlugin(config.globals),
    // new CleanupPlugin(),
    // new FriendlyErrorsPlugin(),
    // new WarningsToErrorsPlugin()
    // new HtmlPlugin({
    //   template: path.join(config.paths.gitRoot, 'webpack', 'index.html'),
    //   inject: 'body',
    //   inlineSource: '.(css)$',
    //   minify: env.isProd() && {
    //     removeComments: true,
    //     collapseWhitespace: true,
    //     removeRedundantAttributes: true,
    //     useShortDoctype: true,
    //     removeEmptyAttributes: true,
    //     removeStyleLinkTypeAttributes: true,
    //     keepClosingSlash: true,
    //     minifyJS: true,
    //     minifyCSS: true,
    //     minifyURLs: true
    //   }
    // }),
    // new HtmlWebpackInlineSourcePlugin(),
    // new MiniCssExtractPlugin({
    //   filename: '[name].[hash:8].css',
    //   chunkFilename: '[id].css'
    // })
  ]

  return c
}
