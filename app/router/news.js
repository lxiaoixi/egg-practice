'use strict';

module.exports = app => {
  const { router, controller } = app;
  //const gzip = app.middleware.gzip({ threshold: 1024 });

  router.get('/news', controller.news.list);
};
