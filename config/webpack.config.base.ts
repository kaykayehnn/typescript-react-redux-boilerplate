import path from 'path'
import { TsConfigPathsPlugin } from 'awesome-typescript-loader'
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import HTMLWebpackPlugin from 'html-webpack-plugin'

import { Configuration } from 'webpack'

export const basePath = path.join(__dirname, '..')
export const outputPath = path.join(basePath, 'dist')

export const cssTest = /\.(sc|sa|c)ss$/

export const htmlPluginOptions: HTMLWebpackPlugin.Options = {
  template: path.join(basePath, 'public', 'index.html'),
  inject: false
}

export const baseConfig: Configuration = {
  context: basePath,
  entry: {
    main: './src/index.tsx',
    polyfills: './src/polyfills.ts'
  },
  output: {
    path: outputPath,
    publicPath: '/'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    plugins: [
      new TsConfigPathsPlugin()
    ]
  },
  optimization: {
    splitChunks: {
      // Excludes polyfills from chunk deduplication, that way all other chunks
      // remain independent and assumptions in html template remain true.
      chunks (chunk) {
        return chunk.name !== 'polyfills'
      },
      cacheGroups: {
        vendors: {
          test: /[/\\]node_modules[/\\]/
        }
      }
    },
    runtimeChunk: 'single'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        options: {
          silent: true
        }
      },
      {
        test: cssTest,
        use: [
          {
            loader: 'typings-for-css-modules-loader',
            options: {
              modules: true,
              camelCase: 'only',
              namedExport: true
              // Sass deals with @import directives, so postcss-loader
              // is fine below css-loader, contrary to their docs
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: __dirname
              }
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
      { from: path.join(basePath, 'public/'), to: outputPath }
    ])
  ]
}
