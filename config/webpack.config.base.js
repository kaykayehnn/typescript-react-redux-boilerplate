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

function mergeRules(a, b) {
  const toConfig = rules => ({
    module: { rules: [{ use: rules }] },
  })

  return smart(toConfig(a), toConfig(b)).module.rules[0].use
}

const baseConfig = {
  context: basePath,
  entry: {
    // This order ensures polyfills are loaded before application source.
    polyfills: './src/polyfills.ts',
    main: './src/index.tsx',
  },
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
          cache: true,
          eslintPath: require.resolve('eslint'),
          formatter: require('react-dev-utils/eslintFormatter'),
        },
      },
      {
        test: jsTest,
        loader: 'babel-loader',
        options: {
          extends: path.join(__dirname, '..', 'babel.config.js'),
          cacheDirectory: true,
        },
      },
      {
        test: cssTest,
        use: cssLoaders,
      },
      {
        test: scssTest,
        use: mergeRules(cssLoaders, scssLoaders),
      },
    ],
  },
  plugins: [
    new CaseSensitivePathsPlugin(),
    new ForkTsCheckerWebpackPlugin({
      async: false,
      silent: true,
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
  baseConfig,
}
