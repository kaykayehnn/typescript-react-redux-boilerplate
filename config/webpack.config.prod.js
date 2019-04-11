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

const modifications = {
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
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            warnings: false,
            comparisons: false,
            inline: 2,
          },
          output: {
            ecma: 5,
            comments: false,
            // eslint-disable-next-line @typescript-eslint/camelcase
            ascii_only: true,
          },
        },
        parallel: true,
        cache: true,
        sourceMap: true,
      }),
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
      // FIXME: change cache id
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
    }),
  ],
}

module.exports = { modifications }
