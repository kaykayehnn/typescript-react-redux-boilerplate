const path = require('path')
const openBrowser = require('react-dev-utils/openBrowser')
const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware')
const evalSourceMapMiddleware = require('react-dev-utils/evalSourceMapMiddleware')

const { cssTest, scssTest, basePath } = require('./webpack.config.base')
const { HotModuleReplacementPlugin } = require('webpack')

const PORT = process.env.PORT || 3000
const PROXY_PORT = process.env.PORT || 9000

const modifications = {
  mode: 'development',
  entry: {
    main: ['react-dev-utils/webpackHotDevClient', './src/index.tsx'],
  },
  output: {
    devtoolModuleFilenameTemplate(info) {
      return path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')
    },
  },
  // Error overlay relies on this
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: cssTest,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: scssTest,
        use: [
          'style-loader',
          'dts-css-modules-loader?namedExport',
          {
            loader: 'css-loader',
            options: {
              localIdentName: '[name]__[local]--[hash:base64:5]',
            },
          },
        ],
      },
    ],
  },
  devServer: {
    host: '0.0.0.0',
    port: PORT,
    contentBase: path.join(basePath, 'public'),
    watchContentBase: true,
    hot: true,
    // Prevents injecting of default webpackHotDevClient
    inline: false,
    historyApiFallback: {
      disableDotRule: true,
    },
    watchOptions: {
      ignored: /[/\\]node_modules[/\\]/,
    },
    proxy: {
      '/api': {
        target: `http://localhost:${PROXY_PORT}`,
      },
    },
    before(app, server) {
      app.use(evalSourceMapMiddleware(server))
      app.use(errorOverlayMiddleware())
    },
    after() {
      openBrowser(`http://localhost:${PORT}/`)
    },
  },
  plugins: [new HotModuleReplacementPlugin()],
}

module.exports = { modifications }
