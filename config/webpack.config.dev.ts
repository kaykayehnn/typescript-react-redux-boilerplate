import { Configuration, HotModuleReplacementPlugin, RuleSetUse } from 'webpack'

export const modifications: Configuration = {
  mode: 'development',
  devtool: 'eval-source-map',
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
        localIdentName: '[local]__[hash:base64:5]'
      }
    },
    'sass-loader'
  ]

  const cssConfigIndex = config.module.rules.findIndex(r => (r.test as RegExp).test('.css'))

  config.module.rules[cssConfigIndex].use = cssLoaders

  return config
}
