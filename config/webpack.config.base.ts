import path from 'path'
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import HTMLWebpackPlugin from 'html-webpack-plugin'

import { Configuration } from 'webpack'

export interface StringMap {
  [key: string]: string
}

export function getAliases (): StringMap {
  const tsconfig = require('../tsconfig.json')
  const pathGlobRgx = /(.+)\/(\*)?/

  let aliases: StringMap = {}

  const paths = tsconfig.compilerOptions.paths
  const pathKeys = Object.keys(paths)

  for (let i = 0; i < pathKeys.length; i++) {
    const k = pathKeys[i]

    const [m, alias, exact] = pathGlobRgx.exec(k)
    const [m2, relativePath] = pathGlobRgx.exec(paths[k])

    const aliasKey = alias + (exact === null ? '$' : '')
    const aliasPath = path.join(basePath, 'src', relativePath)

    aliases[aliasKey] = aliasPath
  }

  return aliases
}

export const basePath = path.join(__dirname, '..')

export const baseConfig: Configuration = {
  context: basePath,
  entry: {
    main: './src/index.tsx',
    polyfills: './src/polyfills.ts'
  },
  output: {
    path: path.join(basePath, 'dist'),
    chunkFilename: '[name].[contenthash].js'
  },
  resolve: {
    // aliases are resolved from tsconfig
    alias: getAliases(),
    extensions: ['.ts', '.tsx', '.js']
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          // only include .js files which are not polyfills
          test: /(?!.*(?:core-js))[/\\]node_modules[/\\]/
        }
      }
    },
    runtimeChunk: 'single'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.(sc|sa|c)ss$/,
        use: [
          // these settings are overriden in dev/prod configs,
          // they only show the least common ancestor in both envs
          {
            loader: 'typings-for-css-modules-loader',
            options: {
              modules: true,
              camelCase: 'only',
              namedExport: true
            }
          },
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new CaseSensitivePathsPlugin(),
    new CopyWebpackPlugin([
      { from: path.join(basePath, 'public/'), to: path.join(basePath, 'dist/') }
    ]),
    new HTMLWebpackPlugin({
      template: path.join(basePath, 'public/index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: false
    })
  ]
}
