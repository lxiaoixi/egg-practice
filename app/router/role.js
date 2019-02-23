module.exports = app => {
  const { controller } = app;

  const subRouter = app.router.namespace('/api/roles');

  subRouter.post('/', controller.roles.add);
  subRouter.get('/', controller.roles.list);
};
