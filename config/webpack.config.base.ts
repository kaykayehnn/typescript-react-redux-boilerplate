import path from 'path'
import { TsConfigPathsPlugin } from 'awesome-typescript-loader'
import { smart } from 'webpack-merge'
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin'
import HTMLWebpackPlugin from 'html-webpack-plugin'

import { Configuration, RuleSetUse } from 'webpack'

export const basePath = path.join(__dirname, '..')
export const outputPath = path.join(basePath, 'dist')

export const htmlPluginOptions: HTMLWebpackPlugin.Options = {
  template: path.join(basePath, 'public', 'index.html')
}

export const cssTest = /\.css$/
export const scssTest = /\.(sc|sa)ss$/

const cssLoaders = [
  {
    loader: 'css-loader',
    options: {
      importLoaders: 1
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
  // Sass-loader resolves @import statements by inlining the files, while css-loader
  // makes require calls which are then split in chunks, which is not the desired behaviour.
  'sass-loader'
]

const scssLoaders: RuleSetUse = [
  'dts-css-modules-loader?namedExport',
  {
    loader: 'css-loader',
    options: {
      modules: true,
      camelCase: 'only'
    }
  }
]

function mergeRules (a: RuleSetUse, b: RuleSetUse): RuleSetUse {
  const toConfig = (rules: RuleSetUse) => ({ module: { rules: [{ use: rules }] } })

  return smart(toConfig(a), toConfig(b)).module.rules[0].use
}

export const baseConfig: Configuration = {
  context: basePath,
  entry: {
    // This order ensures polyfills are loaded before application source.
    polyfills: './src/polyfills.ts',
    main: './src/index.tsx'
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
      // Excludes polyfills from chunk deduplication.
      chunks (chunk) {
        return chunk.name !== 'polyfills'
      },
      cacheGroups: {
        vendors: {
          test: /[/\\]node_modules[/\\](?!\.css&)/
        }
      }
    },
    runtimeChunk: 'single'
  },
  module: {
    rules: [
      {
        test: cssTest,
        use: cssLoaders
      },
      {
        test: scssTest,
        use: mergeRules(cssLoaders, scssLoaders)
      },
      {
        // ATS loader is ran last to allow css type definitions to be generated
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        options: {
          silent: true
        }
      }
    ]
  },
  plugins: [
    new CaseSensitivePathsPlugin(),
    new HTMLWebpackPlugin(htmlPluginOptions)
  ]
}
