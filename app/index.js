'use strict';

require('./globals');

const http = require('http');
const express = require('express');

module.exports = exports = express();
exports.server = http.createServer(exports);

exports.set('views', './app/views');
exports.set('view engine', 'ejs');

// Init webpack dev middleware
if (exports.get('env') === 'development') {
  const webpackConfig = require('../config/webpack.dev');
  const compiler = require('webpack')(webpackConfig);
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  exports.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));
  exports.use(webpackHotMiddleware(compiler));
}

exports.use('/', express.static('./assets'));
exports.route('/*').get((req, res) => res.render('index'));
