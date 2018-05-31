const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: (filePath) => filePath.endsWith('.js') && !filePath.endsWith('.spec.js'),
        exclude: /(node_modules)|(src\/test)/,
        use: { loader: 'babel-loader' }
      }
    ]
  },
  output: {
    library: 'Sdk',
    filename: 'swarm-sdk[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    // Ignore native modules
    new webpack.IgnorePlugin(/ed25519/)
  ]
}
