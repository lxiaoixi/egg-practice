'use strict';

const Controller = require('./baseController');

class NewsController extends Controller {

  async list() {
    const { ctx, service, logger } = this; // ctx,app,service,logger,config

    const page = ctx.query.page || 1;
    const pageSize = ctx.query.pageSize || this.config.news.pageSize;

    const list = await service.news.list(page, pageSize);

    logger.info('list', list.length);

    await ctx.render('news/list', { list });
  }
}

module.exports = NewsController;
