'use strict';

const path = require('path');
const { optimize, ContextReplacementPlugin, EnvironmentPlugin, NoEmitOnErrorsPlugin } = require('webpack');
const { CheckerPlugin  } = require('awesome-typescript-loader');

const sassLoader = {
  loader: 'sass-loader',
  options: {
    includePaths: [path.resolve(__dirname, '../web')],
    sourceMap: true
  }
};

module.exports = {
  context: path.resolve('./web'),
  entry: {
    vendor: './vendor.ts',
    app: './bootstrap.ts'
  },
  output: {
    filename: '[name].js',
    path: path.resolve('./assets'),
    publicPath: '/assets/'
  },
  module: {
    rules: [{
      test: /\.ts$/,
      exclude: [/\.(spec|e2e)\.ts$/],
      use: [
        { loader: 'awesome-typescript-loader', options: { configFileName: './web/tsconfig.json' } },
        { loader: 'angular2-template-loader' }
      ],
    }, {
      test: /\.scss$/,
      rules: [
        { loader: 'css-raw-loader?-sourceMap', include: path.resolve(__dirname, '../web/app') },
        { loader: 'css-raw-loader', exclude: path.resolve(__dirname, '../web/app') },
        { use: sassLoader }
      ]
    }, {
      test: /\.css$/,
      include: path.resolve(__dirname, '../web/app'),
      rules: [
        { loader: 'css-raw-loader?-sourceMap', include: path.resolve(__dirname, '../web/app') },
        { loader: 'css-raw-loader', exclude: path.resolve(__dirname, '../web/app') }
      ]
    }, {
      test: /\.html$/,
      loader: 'raw-loader'
    }]
  },
  plugins: [
    new optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: module => module.context && ~module.context.indexOf('node_modules')
    }),
    new ContextReplacementPlugin(/@angular[/\\]core[/\\]@angular/, path.resolve(__dirname, '../null')),
    new EnvironmentPlugin(['NODE_ENV']),
    new NoEmitOnErrorsPlugin(),
    new CheckerPlugin(),
  ],
  resolve: {
    extensions: ['.ts', '.js', '.json']
  }
};