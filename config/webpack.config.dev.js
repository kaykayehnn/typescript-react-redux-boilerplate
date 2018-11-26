const webpack = require('webpack')

exports.modifications = {
  mode: {
    $set: 'development'
  },
  devtool: {
    $set: 'eval-source-map'
  },
  devServer: {
    $set: {
      port: 3000,
      hot: true,
      historyApiFallback: true,
      proxy: {
        '/api': {
          target: 'http://localhost:9000'
        }
      }
    }
  },
  module: {
    rules: (rules) => {
      rules.find(r => r.test.exec('.scss')).use.unshift('style-loader')

      return rules
    }
  },
  plugins: {
    $push: [
      new webpack.HotModuleReplacementPlugin()
    ]
  }
}
