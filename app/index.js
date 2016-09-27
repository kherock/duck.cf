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
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackConfig = require('../config/webpack.dev');
  const webpack = require('webpack')(webpackConfig);
  exports.use(webpackDevMiddleware(webpack));
}

exports.use('/', express.static('./assets'));
exports.route('/*').get((req, res) => res.render('index'));
