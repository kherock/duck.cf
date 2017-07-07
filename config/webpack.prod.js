'use strict';

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const merge = require('webpack-merge').smartStrategy({ 'module.rules': 'prepend' });

module.exports = merge(require('./webpack.common.js'), {
  devtool: 'hidden-source-map',
  module: {
    rules: [{
      test: /\.scss$/,
      rules: [
        { use: ['css-raw-loader?-sourceMap'], exclude: path.resolve(__dirname, '../web/app') },
        { use: [ExtractTextPlugin.loader()], exclude: path.resolve(__dirname, '../web/app') },
      ]
    }, {
      test: /\.css$/,
      rules: [
        { use: ['css-raw-loader?-sourceMap'], exclude: path.resolve(__dirname, '../web/app') },
        { use: [ExtractTextPlugin.loader()], exclude: path.resolve(__dirname, '../web/app') },
      ]
    }]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css',
      fallback: 'style-loader'
    })
  ]
});
