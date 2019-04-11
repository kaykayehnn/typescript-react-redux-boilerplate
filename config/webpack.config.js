const { smart } = require('webpack-merge')
const { choosePort } = require('react-dev-utils/WebpackDevServerUtils')

const { baseConfig } = require('./webpack.config.base')

// Tools like Cloud9 rely on this.
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000
const HOST = process.env.HOST || '0.0.0.0'

module.exports = function config(env) {
  process.env.BABEL_ENV = env
  process.env.NODE_ENV = env

  switch (env) {
    case 'production':
      return smart(baseConfig, require('./webpack.config.prod')())
    case 'development':
      return choosePort(HOST, DEFAULT_PORT).then(port => {
        if (port == null) {
          // Received "No" as an answer when being asked to choose another port
          return
        }

        return smart(baseConfig, require('./webpack.config.dev')(HOST, port))
      })
    default:
      throw new Error(
        'Expected environment to be development or production, received ' + env
      )
  }
}
