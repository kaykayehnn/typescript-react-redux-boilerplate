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
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            parse: {
              // We want terser to parse ecma 8 code. However, we don't want it
              // to apply any minfication steps that turns valid ecma 5 code
              // into invalid ecma 5 code. This is why the 'compress' and 'output'
              // sections only apply transformations that are ecma 5 safe
              // https://github.com/facebook/create-react-app/pull/4234
              ecma: 8,
            },
            compress: {
              warnings: false,
              // Disabled because of an issue with Uglify breaking seemingly valid code:
              // https://github.com/facebook/create-react-app/issues/2376
              // Pending further investigation:
              // https://github.com/mishoo/UglifyJS2/issues/2011
              comparisons: false,
              // Disabled because of an issue with Terser breaking valid code:
              // https://github.com/facebook/create-react-app/issues/5250
              // Pending futher investigation:
              // https://github.com/terser-js/terser/issues/120
              inline: 2,
            },
            output: {
              ecma: 5,
              comments: false,
              // Turned on because emoji and regex is not minified properly using default
              // https://github.com/facebook/create-react-app/issues/2488
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
        // FIXME: Add font caching. Below is an example config for Google fonts
        // runtimeCaching: [
        //   {
        //     urlPattern: /^https:\/\/fonts\.googleapis\.com/,
        //     handler: 'StaleWhileRevalidate',
        //     options: {
        //       cacheName: 'google-fonts-stylesheets',
        //     },
        //   },
        //   {
        //     urlPattern: /^https:\/\/fonts\.gstatic\.com/,
        //     handler: 'CacheFirst',
        //     options: {
        //       cacheName: 'google-fonts-webfonts',
        //       cacheableResponse: {
        //         statuses: [0, 200],
        //       },
        //       expiration: {
        //         // 1 year
        //         maxAgeSeconds: 60 * 60 * 24 * 365,
        //       },
        //     },
        //   },
        // ],
      }),
    ],
  }
}

module.exports = getModifications
