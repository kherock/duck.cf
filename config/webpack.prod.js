'use strict';

const path = require('path');
const merge = require('webpack-merge');
const { optimize, DefinePlugin } = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractCss = new ExtractTextPlugin({
  filename: '[name].css',
  fallbackLoader: 'style'
});

module.exports = merge.smart(require('./webpack.common.js'), {
  devtool: 'source-map',
  output: {
    devtoolModuleFilenameTemplate: info => 'webpack:///' + info.resource.replace('webpack:///~', '../~').replace('webpack:///', './')
  },
  module: {
    loaders: [{
      test: /\.scss$/,
      exclude: [path.resolve('./web/app')],
      loader: extractCss.extract(['css?sourceMap', 'sass?sourceMap'])
    }, {
      test: /\.css$/,
      exclude: [path.resolve('./web/app')],
      loader: extractCss.extract(['css?sourceMap', 'sass?sourceMap'])
    }]
  },
  plugins: [
    extractCss,
    new optimize.UglifyJsPlugin({ sourceMap: true }),
    new DefinePlugin({ ENVIRONMENT: JSON.stringify('production') }),
  ]
});
