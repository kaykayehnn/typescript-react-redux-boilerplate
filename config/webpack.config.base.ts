import path from 'path'
import { TsConfigPathsPlugin } from 'awesome-typescript-loader'
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import HTMLWebpackPlugin from 'html-webpack-plugin'

import { Configuration } from 'webpack'

export const basePath = path.join(__dirname, '..')

export const baseConfig: Configuration = {
  context: basePath,
  entry: {
    main: './src/index.tsx',
    polyfills: './src/polyfills.ts'
  },
  output: {
    path: path.join(basePath, 'dist/'),
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
