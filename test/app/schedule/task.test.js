const mm = require('egg-mock');

it('should schedule work fine', async() => {
  const app = mm.app();
  await app.ready();
  app.runSchedule('task');
});
