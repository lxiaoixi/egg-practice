'use strict';

module.exports = app => {
  const { controller } = app;

  const subRouter = app.router.namespace('/api/users');

  subRouter.get('/', controller.users.list);
  subRouter.post('/', controller.users.add);
  subRouter.post('/signIn', controller.users.signIn);
  subRouter.get('/captcha', controller.users.captcha);
  subRouter.post('/login', controller.users.login);
};
