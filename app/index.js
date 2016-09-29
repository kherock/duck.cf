'use strict';

require('./globals');

const http = require('http');
const path = require('path');
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
  require('chokidar').watch(['./app/routes.js', './app/*/**/*.js']).
      on('change', (file) => {
        console.log('Clearing', file, 'from require cache');
        delete require.cache[path.resolve(file)];
      });
}

exports.use(express.static('./assets'));
exports.get('*', (req, res, next) => res.format({
  text: () => next(),
  json: () => next(),
  html: () => res.render('index'),
  default: () => res.sendStatus(406)
}));
exports.use((req, res, next) => require('./routes')(req, res, next));
