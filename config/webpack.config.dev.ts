import path from 'path'
import openBrowser from 'react-dev-utils/openBrowser'
import errorOverlayMiddleware from 'react-dev-utils/errorOverlayMiddleware'
import getCSSModuleLocalIdent from 'react-dev-utils/getCSSModuleLocalIdent'

import { cssTest, scssTest, basePath } from './webpack.config.base'
import { Configuration, HotModuleReplacementPlugin } from 'webpack'

const PORT = +process.env.PORT || 3000

export const modifications: Configuration = {
  mode: 'development',
  entry: {
    main: ['react-dev-utils/webpackHotDevClient', './src/index.tsx']
  },
  output: {
    devtoolModuleFilenameTemplate(info) {
      return path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')
    }
  },
  devtool: 'cheap-module-source-map', // error overlay relies on this
  module: {
    rules: [
      {
        test: cssTest,
        use: ['style-loader', 'css-loader']
      },
      {
        test: scssTest,
        use: [
          'style-loader',
          'dts-css-modules-loader?namedExport',
          {
            loader: 'css-loader',
            options: {
              getLocalIdent: getCSSModuleLocalIdent
            }
          }
        ]
      }
    ]
  },
  devServer: {
    host: '0.0.0.0',
    port: PORT,
    contentBase: path.join(basePath, 'public'),
    watchContentBase: true,
    hot: true,
    // Prevents injecting of default webpackHotDevClient
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
    before(app) {
      app.use(errorOverlayMiddleware())
    },
    after() {
      openBrowser(`http://localhost:${PORT}/`)
    }
  },
  plugins: [new HotModuleReplacementPlugin()]
}
