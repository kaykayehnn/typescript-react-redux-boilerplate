const path = require('path')
const env = process.env.BABEL_ENV || process.env.NODE_ENV || 'development'

const isTest = env === 'test'
const isProduction = env === 'production'

module.exports = {
  // Base config for dependencies
  presets: [
    [
      '@babel/preset-env',
      {
        modules: isTest && 'commonjs',
        // configPath is used to resolve browserslist targets
        configPath: __dirname,
        exclude: ['transform-typeof-symbol'],
      },
    ],
  ],
  overrides: [
    // App source
    {
      test: path.join(__dirname, 'src'),
      presets: [
        ['@babel/preset-typescript', { isTSX: true, allExtensions: true }],
        ['@babel/preset-react', { development: !isProduction }],
      ],
      plugins: [
        ['@babel/plugin-transform-runtime', { useESModules: true }],
        '@babel/plugin-syntax-dynamic-import',
        isTest && 'babel-plugin-dynamic-import-node',
      ].filter(Boolean),
    },
  ],
}
