// ============================================================================
// Webpack Loader configuration
// ============================================================================

import * as MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { stringify as q } from 'query-string'
export const EXCLUDE = /(node_modules|bower_components|dist|public)/

export const loaders: { [key: string]: any } = {}

loaders.typescript = {
  test: /\.tsx?$/,
  exclude: EXCLUDE,
  loader: 'ts-loader',
  options: {
    transpileOnly: true
  }
}

loaders.babel = {
  test: /\.jsx?$/,
  exclude: EXCLUDE,
  loader: 'babel-loader'
}

loaders.css = {
  test: /\.css$/,
  exclude: EXCLUDE,
  use: [
    { loader: MiniCssExtractPlugin.loader },
    // { loader: 'style-loader/url' },
    // { loader: 'file-loader' },
    // { loader: 'css-loader', options: { importLoaders: true } },
    { loader: 'css-loader' },
    {
      loader: 'postcss-loader',
      options: {
        plugins: () => {
          return [
            require('postcss-easy-import')(),
            require('postcss-cssnext')({
              features: {
                autoprefixer: { browsers: ['last 2 versions'], cascade: false }
              }
            })
          ]
        }
      }
    }
  ]
}

loaders.base64InlineLoader = {
  test: /\.(woff|woff2|ttf|eot|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
  exclude: EXCLUDE,
  // loader: 'base64-inline-loader?' + q({ limit: 9999999, name: '[name].[ext]' })
  loader: 'file-loader?' + q({ name: '[name].[ext]' })
}

loaders.svg = {
  test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
  exclude: EXCLUDE,
  loader: 'url-loader?' + q({ limit: 10000, mimetype: 'image/svg+xml' })
}

loaders.gif = {
  test: /\.gif/,
  exclude: EXCLUDE,
  loader: 'url-loader?' + q({ limit: 10000, mimetype: 'image/gif' })
}

loaders.jpg = {
  test: /\.jpg/,
  exclude: EXCLUDE,
  loader: 'url-loader?' + q({ limit: 10000, mimetype: 'image/jpg' })
}

loaders.png = {
  test: /\.png/,
  exclude: EXCLUDE,
  loader: 'url-loader?' + q({ limit: 10000, mimetype: 'image/png' })
}

loaders.json = {
  test: /\.(g3dj)$/,
  exclude: EXCLUDE,
  use: 'json-loader'
}

loaders.shaders = {
  test: /\.(vert|frag)$/,
  exclude: EXCLUDE,
  use: 'raw-loader'
}

loaders.ico = {
  test: /\.ico$/,
  exclude: EXCLUDE,
  use: 'url-loader'
}

loaders.raw = {
  test: /\.(xml|html|txt|md)$/,
  exclude: EXCLUDE,
  use: 'raw-loader'
}
