import path from 'path'
import ErrorOverlayPlugin from 'error-overlay-webpack-plugin'
import getCSSModuleLocalIdent from 'react-dev-utils/getCSSModuleLocalIdent'
import openBrowser from 'react-dev-utils/openBrowser'

import { Configuration, HotModuleReplacementPlugin, RuleSetUse } from 'webpack'

const PORT = 3000

export const modifications: Configuration = {
  mode: 'development',
  devtool: 'cheap-module-source-map', // E-O-P relies on this
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
    after () {
      openBrowser(`http://localhost:${PORT}/`)
    }
  },
  plugins: [
    new ErrorOverlayPlugin(),
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
