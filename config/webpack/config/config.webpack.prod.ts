import * as CompressionPlugin from 'compression-webpack-plugin'
import * as path from 'path'
import * as UglifyJsPlugin from 'uglifyjs-webpack-plugin'
import * as webpack from 'webpack'
import * as merge from 'webpack-merge'
import * as config from './config'
import base from './config.webpack.base'

const { __BUILD_DATE__ } = config.EXTRAS
const smartMerge: any = merge.smart

// tslint:disable-next-line:no-default-export
export default () => {
  const c: webpack.Configuration = {}

  c.mode = 'production'

  c.entry = {
    client: [path.join(config.paths.root, 'packages', 'index.js')]
  }

  c.devtool = false

  c.optimization = {
    minimize: true
    // minimizer: [new UglifyJsPlugin()]
  }

  c.output = {
    chunkFilename: '[name].[chunkhash:8].chunk.js',
    filename: `[name].[hash:8].${__BUILD_DATE__}.js`,
    libraryTarget: 'umd'
  }

  c.performance = {
    maxAssetSize: 3 * 1e6,
    maxEntrypointSize: 3 * 1e6,
    hints: 'warning'
  }

  c.plugins = [
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js)$/,
      threshold: 0,
      minRatio: 0.8
    }),

    new webpack.optimize.OccurrenceOrderPlugin(true)
  ]

  return smartMerge(base(), c)
}
