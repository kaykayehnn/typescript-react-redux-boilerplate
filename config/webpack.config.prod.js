const MiniCssExtractPlugin = require('mini-css-extract-plugin')

exports.modifications = {
  mode: {
    $set: 'production'
  },
  output: {
    filename: {
      $set: '[name].[contenthash].js'
    }
  },
  devtool: {
    $set: 'source-map'
  },
  module: {
    rules: (rules) => {
      let cssLoaders = rules.find(r => r.test.exec('.css')).use
      cssLoaders.unshift(MiniCssExtractPlugin.loader)
      cssLoaders.push({
        loader: 'postcss-loader',
        options: {
          config: {
            path: __dirname
          }
        }
      })

      rules.find(r => r.loader === 'awesome-typescript-loader').options = { silent: true }

      return rules
    }
  },
  plugins: {
    $push: [
      new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' })
    ]
  }
}
