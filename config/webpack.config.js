const { smart } = require('webpack-merge')

const { baseConfig } = require('./webpack.config.base')
const { modifications: modificationsDev } = require('./webpack.config.dev')
const { modifications: modificationsProd } = require('./webpack.config.prod')

module.exports = function config(env) {
  process.env.BABEL_ENV = env
  process.env.NODE_ENV = env

  const isProduction = env === 'production'

  const modifications = isProduction ? modificationsProd : modificationsDev
  const config = smart(baseConfig, modifications)

  return config
}
