const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')

const basePath = __dirname
const baseConfig = {
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.join(basePath, 'dist')
  },
  devServer: {
    port: 3000,
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:9000'
      }
    }
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
      {
        test: /\.css$/,
        loader: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: path.join(basePath, 'public/'), to: path.join(basePath, 'dist') }
    ]),
    new HTMLWebpackPlugin({ template: path.join(basePath, 'public/index.html') }),
    new HardSourceWebpackPlugin({
      sizeThreshold: 50 * 1024 * 1024
    })
  ]
}

module.exports = (env) => {
  let config = baseConfig

  if (env === 'production') {
    config.mode = 'production'
    config.devtool = 'source-map'
    config.plugins.unshift(new CleanWebpackPlugin(['dist']))
  } else {
    config.mode = 'development'
    config.devtool = 'inline-source-map'
    config.plugins.push(new webpack.HotModuleReplacementPlugin())
  }

  return config
}
