import CleanWebpackPlugin from 'clean-webpack-plugin'
import HardSourceWebpackPlugin from 'hard-source-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

import { basePath } from './webpack.config.base'
import { Configuration, RuleSetUse } from 'webpack'

export const modifications: Configuration = {
  mode: 'production',
  output: {
    filename: 'static/js/[name].[contenthash].js',
    chunkFilename: 'static/js/[name].[contenthash].js'
  },
  devtool: 'source-map',
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

export function applyConfig (config: Configuration): Configuration {
  const cssLoaders: RuleSetUse = [
    MiniCssExtractPlugin.loader,
    {
      loader: 'typings-for-css-modules-loader',
      options: {
        modules: true,
        camelCase: 'only',
        namedExport: true,
        localIdentName: '[hash:base64:5]'
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        config: {
          path: __dirname
        }
      }
    },
    'sass-loader'
  ]

  const cssConfigIndex = config.module.rules.findIndex(r => (r.test as RegExp).test('.css'))

  config.module.rules[cssConfigIndex].use = cssLoaders

  return config
}
