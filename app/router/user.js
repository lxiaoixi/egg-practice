'use strict';

module.exports = app => {
  const { controller } = app;

  const subRouter = app.router.namespace('/api/users');

  subRouter.get('/', controller.users.list);
  subRouter.post('/', controller.users.add);
};
