import path from 'path'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'

import { basePath } from './webpack.config.base'
import { Configuration, RuleSetUse } from 'webpack'

export const modifications: Configuration = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js'
  },
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin('dist', { root: basePath }),
    new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' })
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
