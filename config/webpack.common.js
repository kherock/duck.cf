'use strict';

const path = require('path');
const { optimize, ContextReplacementPlugin } = require('webpack');
const { ForkCheckerPlugin, TsConfigPathsPlugin } = require('awesome-typescript-loader');

module.exports = {
  context: path.resolve('./web'),
  entry: {
    app: ['./bootstrap.ts'],
    vendor: ['./vendor.ts']
  },
  output: {
    path: path.resolve('./assets'),
    publicPath: '/',
    filename: '[name].js'
  },
  module: {
    loaders: [{
      test: /\.ts$/,
      loaders: ['awesome-typescript?tsconfig=./web/tsconfig.json', 'angular2-template'],
      exclude: [/\.(spec|e2e)\.ts$/]
    }, {
      test: /\.scss$/,
      include: [path.resolve('./web/app')],
      loaders: ['raw', 'sass?sourceMap']
    }, {
      test: /\.scss$/,
      exclude: [path.resolve('./web/app')],
      loaders: ['style', 'css?sourceMap', 'sass?sourceMap']
    }, {
      test: /\.css$/,
      include: [path.resolve('./web/app')],
      loaders: ['raw', 'css?sourceMap']
    }, {
      test: /\.css$/,
      exclude: [path.resolve('./web/app')],
      loaders: ['style', 'css?sourceMap']
    }, {
      test: /\.html$/,
      loader: 'raw'
    }]
  },
  plugins: [
    new optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js',
      minChunks: Infinity
    }),
    new ContextReplacementPlugin(
        // The (\\|\/) piece accounts for path separators in *nix and Windows
        /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
        path.resolve('./web')
    ),
    new ForkCheckerPlugin(),
    new TsConfigPathsPlugin()
  ],
  resolve: {
    extensions: ['', '.ts', '.js', '.json']
  }
};