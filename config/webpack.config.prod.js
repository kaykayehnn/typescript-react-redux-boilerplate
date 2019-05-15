const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin')
const { GenerateSW } = require('workbox-webpack-plugin')

const {
  htmlPluginOptions,
  cssTest,
  scssTest,
  basePath,
} = require('./webpack.config.base')

const htmlPluginProdOptions = {
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
    minifyURLs: true,
  },
}

function getModifications() {
  return {
    mode: 'production',
    output: {
      filename: 'static/js/[name].[contenthash].js',
      chunkFilename: 'static/js/[name].[contenthash].js',
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: cssTest,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: scssTest,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                localIdentName: '[hash:base64:5]',
              },
            },
          ],
        },
      ],
    },
    stats: {
      children: false,
      entrypoints: false,
      modules: false,
    },
    plugins: [
      new CleanWebpackPlugin(),
      new CopyWebpackPlugin([path.join(basePath, 'public/')]),
      new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash].css',
      }),
      new HTMLWebpackPlugin(htmlPluginProdOptions),
      // 404 page for static file hosts
      new HTMLWebpackPlugin({
        ...htmlPluginProdOptions,
        filename: '404.html',
      }),
      new InlineChunkHtmlPlugin(HTMLWebpackPlugin, [/runtime/]),
      new GenerateSW({
        // FIXME: Change cache id
        cacheId: 'react-app',
        clientsClaim: true,
        navigateFallback: '/index.html',
        include: [/^index\.html$/, /static/],
        exclude: [
          /\.map$/,
          /^manifest.*\.js(?:on)?$/,
          /runtime.*\.js$/,
          /\.DS_STORE$/i,
        ],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'google-fonts-stylesheets',
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              cacheableResponse: {
                statuses: [0, 200],
              },
              expiration: {
                // 1 year
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
            },
          },
        ],
      }),
    ],
  }
}

module.exports = getModifications
