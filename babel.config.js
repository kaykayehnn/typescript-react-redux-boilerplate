const path = require('path')

const env = process.env.BABEL_ENV || process.env.NODE_ENV || 'development'
const rootDir = __dirname

const isDevelopment = env === 'development'
const isProduction = env === 'production'
const isTest = env === 'test'

module.exports = {
  // Base config for dependencies
  presets: [
    [
      '@babel/preset-env',
      {
        ...(isTest && {
          modules: 'commonjs',
          targets: {
            node: 'current',
          },
        }),
        exclude: ['transform-typeof-symbol'],
      },
    ],
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        useESModules: isDevelopment || isProduction,
        // Regenerator runtime is included in polyfills
        regenerator: false,
      },
    ],
  ],
  overrides: [
    {
      test: [
        // App source
        path.join(rootDir, 'src'),
        // Assets processed by loaders
        path.join(rootDir, 'public'),
      ],
      presets: [
        '@babel/preset-typescript',
        ['@babel/preset-react', { development: isDevelopment || isTest }],
      ],
      plugins: [
        '@babel/plugin-syntax-dynamic-import',
        isTest && 'babel-plugin-dynamic-import-node',
      ].filter(Boolean),
    },
  ],
}
