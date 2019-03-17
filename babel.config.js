const env = process.env.BABEL_ENV || process.env.NODE_ENV || 'development'

const isTest = env === 'test'
const isProduction = env === 'production'

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: isTest && 'commonjs',
        exclude: ['transform-typeof-symbol']
      }
    ],
    ['@babel/preset-typescript', { isTSX: true, allExtensions: true }],
    ['@babel/preset-react', { development: !isProduction }]
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-syntax-dynamic-import',
    isTest && 'dynamic-import-node'
  ].filter(Boolean)
}
