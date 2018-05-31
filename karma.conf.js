let webpack = require('webpack')
let path = require('path')

module.exports = function (config) {
  config.set({
    frameworks: ['mocha'],
    browsers: ['Chrome'],

    client: {
      mocha: {
        require: [require.resolve('./mocha-requires.js')]
      }
    },

    files: [
      'src/**/*.spec.js'
    ],

    preprocessors: {
      'src/**/*.spec.js': ['webpack'],
      './mocha-requires.js': ['webpack']
    },

    webpack: {
      mode: 'production',
      module: {
        rules: [
          {
            test: (filePath) => filePath.endsWith('.js'),
            exclude: /(node_modules)/,
            use: { loader: 'babel-loader' }
          }
        ]
      },
      output: {
        library: 'SwarmSdk',
        filename: 'swarm-sdk[hash].js',
        path: path.resolve(__dirname, 'dist')
      },
      plugins: [
        // Ignore native modules
        new webpack.IgnorePlugin(/ed25519/)
      ],
      performance: {
        hints: false
      }

    },

    webpackMiddleware: {
      noInfo: true
    },

    singleRun: true,

    reporters: ['progress']
  })
}
