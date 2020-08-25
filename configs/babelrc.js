const path = require('path'),
  root = path.resolve(__dirname, '../')

const mode = process.env.NODE_ENV,
  isDev = mode === 'development',
  isProd = mode === 'production'

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: require(`${root}/package.json`).browserslist,
        },
        modules: false,
        loose: true,
        spec: true,
        forceAllTransforms: true,
        useBuiltIns: 'usage',
        corejs: 3,
        debug: false,
      },
    ],
    [
      '@babel/preset-typescript',
      {
        isTSX: true,
        allExtensions: true,
        allowNamespaces: true,
        onlyRemoveTypeImports: true,
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    isDev && require.resolve('react-refresh/babel'),
  ].filter(Boolean),
}
