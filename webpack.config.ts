import deepMerge from 'deepmerge'
import isPlainObject from 'is-plain-object'

import { baseConfig } from './config/webpack.config.base'
import {
  modifications as modificationsDev,
  applyConfig as applyConfigDev
} from './config/webpack.config.dev'
import {
  modifications as modificationsProd,
  applyConfig as applyConfigProd
} from './config/webpack.config.prod'

import { Configuration } from 'webpack'

export default function config (env: string = 'development'): Configuration {
  const isProduction = env === 'production'
  const mergeOptions: deepMerge.Options = {
    isMergeableObject (value) {
      return Array.isArray(value) || isPlainObject(value)
    }
  }

  process.env.NODE_ENV = env

  let modifications = isProduction ? modificationsProd : modificationsDev
  let applyConfig = isProduction ? applyConfigProd : applyConfigDev

  let config = deepMerge<Configuration>(baseConfig, modifications, mergeOptions)
  config = applyConfig(config)

  return config
}

let a = config('')
