import CleanWebpackPlugin from 'clean-webpack-plugin'
import HardSourceWebpackPlugin from 'hard-source-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

import { basePath, cssTest } from './webpack.config.base'
import { Configuration } from 'webpack'

export const modifications: Configuration = {
  mode: 'production',
  output: {
    filename: 'static/js/[name].[contenthash].js',
    chunkFilename: 'static/js/[name].[contenthash].js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: cssTest,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'typings-for-css-modules-loader',
            options: {
              localIdentName: '[hash:base64:5]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin('dist/', { root: basePath }),
    new HardSourceWebpackPlugin({
      info: {
        mode: 'none',
        level: 'warn'
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash].css'
    })
  ]
}
