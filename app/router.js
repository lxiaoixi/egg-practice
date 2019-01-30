'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const gzip = app.middleware.gzip({ threshold: 1024 });

  router.get('/', gzip, controller.home.index);
  require('./router/news.js')(app);
};
