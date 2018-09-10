const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

exports.modifications = {
  mode: {
    $set: 'production'
  },
  devtool: {
    $set: 'source-map'
  },
  module: {
    rules: (rules) => {
      rules.find(r => r.test.exec('a.css')).loader.unshift(MiniCssExtractPlugin.loader)
      rules.find(r => r.loader === 'awesome-typescript-loader').options = { silent: true }

      return rules
    }
  },
  optimization: {
    minimizer: {
      $set: [
        new UglifyJsPlugin({ sourceMap: true }),
        new OptimizeCssAssetsPlugin()
      ]
    }
  },
  plugins: {
    $push: [
      new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' })
    ]
  }
}
