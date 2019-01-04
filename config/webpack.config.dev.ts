import path from 'path'
import openBrowser from 'react-dev-utils/openBrowser'
import errorOverlayMiddleware from 'react-dev-utils/errorOverlayMiddleware'
import getCSSModuleLocalIdent from 'react-dev-utils/getCSSModuleLocalIdent'

import { Configuration, HotModuleReplacementPlugin, RuleSetUse } from 'webpack'

const PORT = 3000

export const modifications: Configuration = {
  mode: 'development',
  entry: {
    main: [
      'react-dev-utils/webpackHotDevClient',
      './src/index.tsx'
    ]
  },
  devtool: 'cheap-module-source-map', // E-O-P relies on this FIXME: ?
  output: {
    devtoolModuleFilenameTemplate (info) {
      return path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')
    }
  },
  devServer: {
    port: PORT,
    hot: true,
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
    new HotModuleReplacementPlugin()
  ]
}

export function applyConfig (config: Configuration): Configuration {
  const cssLoaders: RuleSetUse = [
    'style-loader',
    {
      loader: 'typings-for-css-modules-loader',
      options: {
        modules: true,
        camelCase: 'only',
        namedExport: true,
        getLocalIdent: getCSSModuleLocalIdent
      }
    },
    'sass-loader'
  ]

  const cssConfigIndex = config.module.rules.findIndex(r => (r.test as RegExp).test('.css'))

  config.module.rules[cssConfigIndex].use = cssLoaders

  return config
}
