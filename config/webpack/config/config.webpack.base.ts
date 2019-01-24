import * as FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin'
import * as HtmlWebpackInlineSourcePlugin from 'html-webpack-inline-source-plugin'
import * as HtmlPlugin from 'html-webpack-plugin'
import { values } from 'lodash'
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin'
import * as path from 'path'
import * as WarningsToErrorsPlugin from 'warnings-to-errors-webpack-plugin'
import * as webpack from 'webpack'
import * as CleanupPlugin from 'webpack-cleanup-plugin'
import * as ConcatPlugin from 'webpack-concat-plugin'
import * as vendor from './concat.config'
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
    new webpack.DefinePlugin(config.globals),
    new CleanupPlugin(),
    new FriendlyErrorsPlugin(),
    new WarningsToErrorsPlugin(),
    new HtmlPlugin({
      template: path.join(config.paths.gitRoot, 'webpack', 'index.html'),
      inject: 'body',
      inlineSource: '.(css)$',
      minify: env.isProd() && {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new HtmlWebpackInlineSourcePlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[hash:8].css',
      chunkFilename: '[id].css'
    }),
    new ConcatPlugin({
      // TODO: Use source maps in production. Prebundle with cdn-plugin
      uglify: {
        sourceMap: {
          filename: 'out.js',
          url: 'out.js.map'
        },
        compress: env.isProd() && {
          hoist_vars: true
        },
        mangle: env.isProd() && {},
        output: {
          beautify: env.isDev()
        }
      },
      sourceMap: false, // does not work yet
      outputPath: '',
      name: 'vendor',
      fileName: '[name].[hash:8].js',
      filesToConcat: vendor.all,
      injectType: 'prepend'
    })
  ]

  return c
}
