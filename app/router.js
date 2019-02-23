'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.get('/', controller.home.index);
  router.get('/chat', controller.home.chat);

  require('./router/user')(app);
  require('./router/role')(app);

  require('./io/routes/index')(app);
};
