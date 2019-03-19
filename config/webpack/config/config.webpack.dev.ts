// import * as HardSourcePlugin from 'hard-source-webpack-plugin'
import * as path from 'path'
import * as webpack from 'webpack'
// import * as BuildNotifierPlugin from 'webpack-build-notifier'
import * as merge from 'webpack-merge'
import * as config from './config'
import base from './config.webpack.base'

const smartMerge: any = merge.smart

// tslint:disable-next-line:no-default-export
export default () => {
  const c: webpack.Configuration = {}

  c.mode = 'development'

  c.devtool = 'source-map'

  c.entry = {
    client: [
      'babel-regenerator-runtime',
      path.join(config.paths.root, 'packages', 'index.js')
    ]
  }

  c.output = {
    chunkFilename: '[name].[chunkhash:8].chunk.js',
    filename: `[name].[hash:8].js`,
    libraryTarget: 'umd'
  }

  c.plugins = [
    // new HardSourcePlugin(),
    // prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin(),
    // new webpack.DefinePlugin(config.globals),
    // do not emit compiled assets that include errors
    new webpack.NoEmitOnErrorsPlugin()
    // new BuildNotifierPlugin({
    //   title: 'Webpack Build',
    //   suppressSuccess: true
    // })
  ]

  return smartMerge(base(), c)
}
