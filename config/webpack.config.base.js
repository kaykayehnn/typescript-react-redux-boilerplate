const path = require('path')
const { smart } = require('webpack-merge')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')

const createPathsMapper = require('./path-mapper')

const basePath = path.join(__dirname, '..')
const outputPath = path.join(basePath, 'dist')

const htmlPluginOptions = {
  template: path.join(basePath, 'public', 'index.html'),
}

const jsTest = /\.[jt]sx?$/
const cssTest = /\.css$/
const scssTest = /\.(sc|sa)ss$/
const svgTest = /\.svg$/

const cssLoaders = [
  {
    loader: 'css-loader',
    options: {
      importLoaders: 1,
    },
  },
  {
    loader: 'postcss-loader',
    options: {
      config: {
        path: __dirname,
      },
    },
  },
  // Sass-loader resolves @import statements by inlining the files, while
  // css-loader makes require calls which are then split in chunks, which is
  // not the desired behaviour.
  'sass-loader',
]

const scssLoaders = [
  'dts-css-modules-loader?namedExport',
  {
    loader: 'css-loader',
    options: {
      modules: true,
      camelCase: 'only',
    },
  },
]

const jsLoader = 'babel-loader?cacheDirectory'

function mergeRules(a, b) {
  const toConfig = rules => ({
    module: { rules: [{ use: rules }] },
  })

  return smart(toConfig(a), toConfig(b)).module.rules[0].use
}

const baseConfig = {
  context: basePath,
  entry: './src/index.tsx',
  output: {
    path: outputPath,
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: createPathsMapper(path.join(basePath, 'src')),
  },
  optimization: {
    splitChunks: {
      // Excludes polyfills from chunk deduplication.
      chunks(chunk) {
        return chunk.name !== 'polyfills'
      },
    },
    runtimeChunk: 'single',
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: jsTest,
        loader: 'eslint-loader',
        include: /[/\\]src[/\\]/,
        enforce: 'pre',
        options: {
          formatter: require('react-dev-utils/eslintFormatter'),
        },
      },
      {
        test: jsTest,
        loader: jsLoader,
      },
      {
        test: cssTest,
        use: cssLoaders,
      },
      {
        test: scssTest,
        use: mergeRules(cssLoaders, scssLoaders),
      },
      {
        test: svgTest,
        use: [
          jsLoader,
          '@svgr/webpack?babel=0',
          // Assets less than 5K are embedded as data URIs
          'url-loader?limit=5000',
        ],
      },
    ],
  },
  plugins: [
    new CaseSensitivePathsPlugin(),
    new ForkTsCheckerWebpackPlugin({
      watch: path.join(basePath, 'src'),
      formatter: require('react-dev-utils/typescriptFormatter'),
    }),
    new HTMLWebpackPlugin(htmlPluginOptions),
  ],
}

module.exports = {
  basePath,
  outputPath,
  htmlPluginOptions,
  cssTest,
  scssTest,
  svgTest,
  baseConfig,
}
