'use strict';

const { DefinePlugin } = require('webpack');
const merge = require('webpack-merge');

module.exports = merge(require('./webpack.common.js'), {
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new DefinePlugin({ ENVIRONMENT: JSON.stringify('development') }),
  ]
});