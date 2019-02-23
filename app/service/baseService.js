const Service = require('egg').Service;

class BaseService extends Service {
  /**
   *
   * @param {*表名} tableName
   * @param {*查询参数} options
   * @param {*当前页} page
   * @param {*页数} pageSize
   */

  async pagination(tableName, options = {}, page, pageSize) {
    const { app } = this;
    const { mysql } = app;
    options = Object.assign(options, { limit: pageSize, offset: (page - 1) * pageSize });
    const list = await mysql.select(tableName, options);
    const sum = await mysql.count(tableName, options.where ? options.where : {});

    return {
      current: page,
      pageSize: pageSize,
      total: sum,
      totalPage: Math.ceil(sum / pageSize),
      list: list
    };
  }

}

module.exports = BaseService;
