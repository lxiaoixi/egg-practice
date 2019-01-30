const Service = require('egg').Service;

class NewsService extends Service {

  async list(page = 1, pageSize = 10) {
    const { ctx, config } = this; // ctx,app,service,logger,config
    const { serverUrl } = config.news;
    const { data } = await ctx.curl(`${serverUrl}/search/?page=${page}&hitsPerPage=${pageSize}`, {
      dataType: 'json'
    });

    const { hits: list } = data;
    return list;
  }
}

module.exports = NewsService;

