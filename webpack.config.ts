import { smart } from 'webpack-merge'

import { baseConfig } from './config/webpack.config.base'
import { modifications as modificationsDev } from './config/webpack.config.dev'
import { modifications as modificationsProd } from './config/webpack.config.prod'

import { Configuration } from 'webpack'

export default function config(env: string): Configuration {
  process.env.BABEL_ENV = env
  process.env.NODE_ENV = env

  const isProduction = env === 'production'

  let modifications = isProduction ? modificationsProd : modificationsDev
  let config = smart(baseConfig, modifications)

  return config
}
