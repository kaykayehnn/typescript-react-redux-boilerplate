const update = require('immutability-helper')
const { baseConfig } = require('./config/webpack.config.base')

module.exports = (env) => {
  let path = `./config/webpack.config.${env === 'production' ? 'prod' : 'dev'}`
  let { modifications } = require(path)

  return update(baseConfig, modifications)
}
