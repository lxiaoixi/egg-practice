'use strict';

const Controller = require('egg').Controller;

class NewsController extends Controller {

  async list() {
    const ctx = this.ctx;

    const page = ctx.query.page || 1;
    const pageSize = ctx.query.pageSize || this.config.news.pageSize;

    const list = await ctx.service.news.list(page, pageSize);

    this.logger.info('list', list.length);

    await ctx.render('news/list', { list });
  }
}

module.exports = NewsController;
