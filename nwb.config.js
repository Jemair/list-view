module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: false
  },
  webpack: {
    rules: {
      "less-css": {
        modules: true,
        localIdentName: '[folder]-[local]'
      },
    },
  }
}
