import CleanWebpackPlugin from 'clean-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import HTMLWebpackPlugin from 'html-webpack-plugin'
import InlineChunkHtmlPlugin from 'react-dev-utils/InlineChunkHtmlPlugin'

import { htmlPluginOptions, cssTest, scssTest, outputPath, basePath } from './webpack.config.base'
import { Configuration } from 'webpack'

const htmlPluginProdOptions: HTMLWebpackPlugin.Options = {
  ...htmlPluginOptions,
  minify: {
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
}

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
          'css-loader'
        ]
      },
      {
        test: scssTest,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              localIdentName: '[hash:base64:5]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(outputPath, { root: basePath }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash].css'
    }),
    new HTMLWebpackPlugin(htmlPluginProdOptions),
    // 404 page for static file hosts
    new HTMLWebpackPlugin({
      ...htmlPluginProdOptions,
      filename: '404.html'
    }),
    new InlineChunkHtmlPlugin(HTMLWebpackPlugin, [/runtime/])
  ]
}
