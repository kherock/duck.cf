'use strict';

const { optimize, DefinePlugin } = require('webpack');
const merge = require('webpack-merge');

module.exports = merge(require('./webpack.common.js'), {
  devtool: 'source-map',
  plugins: [
    new optimize.UglifyJsPlugin(),
    new DefinePlugin({ ENVIRONMENT: JSON.stringify('production') })
  ]
});