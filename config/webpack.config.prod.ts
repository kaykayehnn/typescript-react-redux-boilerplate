import path from 'path'
import TerserPlugin from 'terser-webpack-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import HTMLWebpackPlugin from 'html-webpack-plugin'
import InlineChunkHtmlPlugin from 'react-dev-utils/InlineChunkHtmlPlugin'
import { GenerateSW } from 'workbox-webpack-plugin'

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
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8
          },
          compress: {
            warnings: false,
            comparisons: false,
            inline: 2
          },
          mangle: {
            safari10: true
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true
          }
        },
        parallel: true,
        cache: true,
        sourceMap: true
      })
    ]
  },
  plugins: [
    new CleanWebpackPlugin(outputPath, { root: basePath }),
    new CopyWebpackPlugin([
      path.join(basePath, 'public/')
    ]),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash].css'
    }),
    new HTMLWebpackPlugin(htmlPluginProdOptions),
    // 404 page for static file hosts
    new HTMLWebpackPlugin({
      ...htmlPluginProdOptions,
      filename: '404.html'
    }),
    new InlineChunkHtmlPlugin(HTMLWebpackPlugin, [/runtime/]),
    new GenerateSW({
      // FIXME: change cache id
      cacheId: 'react-app',
      // skipWaiting could cause issues with in some cases.
      // See https://goo.gl/eKVrTU
      skipWaiting: true,
      clientsClaim: true,
      navigateFallback: '/index.html',
      include: [
        /^index\.html$/,
        /static/
      ],
      exclude: [
        /\.map$/,
        /^manifest.*\.js(?:on)?$/,
        /runtime.*\.js$/,
        /\.DS_STORE$/i
      ]
    })
  ]
}
