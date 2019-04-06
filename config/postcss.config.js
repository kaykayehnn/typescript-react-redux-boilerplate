module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-normalize')({ forceImport: true }),
    require('postcss-flexbugs-fixes'),
    process.env.NODE_ENV === 'production' &&
      require('cssnano')({
        preset: [
          'default',
          {
            discardComments: {
              removeAll: true,
            },
          },
        ],
      }),
  ].filter(Boolean),
}
