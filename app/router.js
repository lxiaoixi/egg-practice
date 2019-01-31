'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, io } = app;
  const gzip = app.middleware.gzip({ threshold: 1024 });

  router.get('/', gzip, controller.home.index);
  router.get('/ceshi', controller.home.ceshi);
  require('./router/news.js')(app);

  io.of('/example').route('exchange', io.controller.nsp.exchange);
};
