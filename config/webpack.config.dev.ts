import path from 'path'
import openBrowser from 'react-dev-utils/openBrowser'
import errorOverlayMiddleware from 'react-dev-utils/errorOverlayMiddleware'
import getCSSModuleLocalIdent from 'react-dev-utils/getCSSModuleLocalIdent'
import HTMLWebpackPlugin from 'html-webpack-plugin'

import { cssTest, htmlPluginOptions } from './webpack.config.base'
import { Configuration, HotModuleReplacementPlugin } from 'webpack'

const PORT = +process.env.PORT || 3000

export const modifications: Configuration = {
  mode: 'development',
  entry: {
    main: [
      'react-dev-utils/webpackHotDevClient',
      './src/index.tsx'
    ]
  },
  output: {
    devtoolModuleFilenameTemplate (info) {
      return path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')
    }
  },
  devtool: 'cheap-module-source-map', // E-O-P relies on this
  module: {
    rules: [
      {
        test: cssTest,
        use: [
          'style-loader',
          {
            loader: 'typings-for-css-modules-loader',
            options: {
              getLocalIdent: getCSSModuleLocalIdent
            }
          }
        ]
      }
    ]
  },
  devServer: {
    port: PORT,
    hot: true,
    inline: false,
    historyApiFallback: true,
    watchOptions: {
      ignored: /[/\\]node_modules[/\\]/
    },
    proxy: {
      '/api': {
        target: 'http://localhost:9000'
      }
    },
    before (app) {
      app.use(errorOverlayMiddleware())
    },
    after () {
      openBrowser(`http://localhost:${PORT}/`)
    }
  },
  plugins: [
    new HotModuleReplacementPlugin(),
    new HTMLWebpackPlugin(htmlPluginOptions)
  ]
}
