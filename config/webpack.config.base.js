const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')

const basePath = exports.basePath = path.join(__dirname, '..')
exports.baseConfig = {
  context: basePath,
  entry: {
    main: './src/index.tsx',
    polyfills: './src/polyfills.ts'
  },
  output: {
    path: path.join(basePath, 'dist')
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        name: '[name].[chunkhash].js',
        vendor: {
          // only include .js files which are not polyfills
          test: /(?!.*(?:core-js|whatwg-fetch))[/\\]node_modules[/\\].*(?=\.js)/,
          chunks: 'all'
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'typings-for-css-modules-loader',
            options: {
              modules: true,
              camelCase: 'only',
              namedExport: true
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: path.join(basePath, 'public/'), to: path.join(basePath, 'dist/') }
    ]),
    new HTMLWebpackPlugin({
      template: path.join(basePath, 'public/index.html'),
      minify: {
        collapseWhitespace: true,
        minifyJS: true
      },
      inject: false
    })
  ]
}
