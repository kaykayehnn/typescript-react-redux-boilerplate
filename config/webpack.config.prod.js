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
      let css = rules.find(r => r.test.exec('.css'))
      css.loader.unshift(MiniCssExtractPlugin.loader)
      css.loader.push({
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
