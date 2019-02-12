'use strict';

const Controller = require('./baseController');

class UserController extends Controller {

  async list() {
    const { ctx, service, logger, config, app } = this; // ctx,app,service,logger,config

    const page = ctx.query.page || 1;
    const pageSize = ctx.query.pageSize || config.news.pageSize;

    const list = await service.users.list(page, pageSize);

    logger.info('csrf token', ctx.csrf);

    logger.info('list', list.length);

    app.io.of('/').adapter.pubClient.publish('first channel', 'publish a message');

    this.response(200, list, '000000');
  }

  async add() {
    const { ctx, service, logger } = this;

    const body = ctx.request.body;

    logger.info('add user', body);

    await service.users.add(body.user);

    this.response(201, 'success', '000000');
  }
}

module.exports = UserController;
