'use strict';

const path = require('path');
const { NamedModulesPlugin } = require('webpack');
const merge = require('webpack-merge').smartStrategy({ 'module.rules': 'prepend' });

if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development';
module.exports = merge(require('./webpack.common.js'), {
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    overlay: true,
    contentBase: false,
    port: 9000
  },
  module: {
    rules: [{
      test: /\.ts$/,
      loaders: ['@angularclass/hmr-loader']
    }, {
      test: /\.scss$/,
      rules: [{ use: ['style-loader?sourceRoot=webpack:///'], exclude: path.resolve(__dirname, '../web/app') }]
    }, {
      test: /\.css$/,
      rules: [{ use: ['style-loader?sourceRoot=webpack:///'], exclude: path.resolve(__dirname, '../web/app') }]
    }],
  },
  plugins: [
    new NamedModulesPlugin()
  ]
});
