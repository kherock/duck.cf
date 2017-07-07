'use strict';

const http = require('http');
const path = require('path');
const Koa = require('koa');
const logger = require('koa-logger');
const mount = require('koa-mount');
const render = require('koa-ejs');
const serve = require('koa-static');

const globs = {
  ROUTE: 'app/api/**/*.js',
  MODEL: 'app/models/**/*.js'
};

module.exports = exports = new Koa();

exports.name = 'Duck';

render(exports, {
  root: './app/views',
  layout: false,
  viewExt: 'ejs',
  cache: process.env.NODE_ENV === 'production'
});

exports.use(logger());
// Init dev middleware
if (exports.env === 'development') {
  exports.use(mount('/assets', async (ctx, next) => {
    const request = http.get({ port: 9000, path: ctx.originalUrl, headers: ctx.headers });
    try {
      const response = await new Promise((resolve, reject) => {
        request.on('error', reject);
        request.on('response', resolve);
      });
      if (response.statusCode === 404) ctx.throw(404);
      for (const header in response.headers) {
        if (header.match(/^(host|transfer-encoding)$/)) continue;
        ctx.set(header, response.headers[header]);
      }
      ctx.status = response.statusCode;
      ctx.body = response;
    } catch (err) { await next(); }
  }));
  require('chokidar').watch(Object.values(globs)).
      on('change', file => clearRequire(module, file)).
      on('unlink', file => clearRequire(module, file));
}

exports.use(mount('/assets', serve('assets')));

exports.use((ctx, next) => {
  switch (ctx.accepts('text', 'json', 'html')) {
  case 'text': return next();
  case 'json': return next();
  case 'html': return ctx.render('index', ctx);
  default: ctx.throw(406);
  }
});
exports.use((ctx, next) => require('./api')(ctx, next));
exports.server = http.createServer(exports.callback());

exports.run = function () {
  return Promise.fromCallback(done => exports.server.listen(3000, done));
};

/**
 * Recursively clears modules and module dependents from the require cache on change
 */
function clearRequire(root, file) {
  const minimatch = require('minimatch');
  const module = require.cache[path.resolve(file)];
  if (!module) return;

  if (minimatch(file, globs.MODEL)) {
    const model = module.exports;
    delete model.base.modelSchemas[model.modelName];
    delete model.base.models[model.modelName];
    console.log('Clearing model'.yellow, model.modelName, 'from require cache'.yellow);
  } else if (minimatch(file, globs.ROUTE)) {
    console.log('Clearing routes in'.yellow, file, 'from require cache'.yellow);
  }

  delete require.cache[module.filename];

  if (module.parent !== root) clearRequire(root, path.relative('', module.parent.filename));
}