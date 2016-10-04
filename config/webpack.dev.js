'use strict';

const { optimize, DefinePlugin, HotModuleReplacementPlugin, NamedModulesPlugin, NoErrorsPlugin } = require('webpack');
const merge = require('webpack-merge');

module.exports = merge.smart(require('./webpack.common.js'), {
  devtool: 'cheap-module-source-map',
  entry: {
    app: ['webpack-hot-middleware/client'],
    vendor: ['webpack-hot-middleware/client']
  },
  module: {
    loaders: [{
      test: /\.ts$/,
      loaders: ['@angularclass/hmr-loader'],
    }]
  },
  plugins: [
    new optimize.OccurrenceOrderPlugin(),
    new NamedModulesPlugin(),
    new HotModuleReplacementPlugin(),
    new NoErrorsPlugin(),
    new DefinePlugin({ ENVIRONMENT: JSON.stringify('development') }),
  ]
});
