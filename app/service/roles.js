const Service = require('./baseService');

class RoleService extends Service {

  async add(role) {

    const { app, logger } = this;
    const { mysql } = app;

    role.createAt = new Date();
    logger.info('add role', role);
    await mysql.insert('role', role);
  }

  async checkIsExit(name) {
    const { app } = this;
    const { mysql } = app;

    return await mysql.get('role', { name });
  }

  async list(data) {
    const { config, logger } = this;

    logger.info('role list', data);

    const { page = 1, pageSize = config.page.pageSize } = data;
    const options = {
      // where: { id: [ 1, 2 ] },
      columns: [ 'id', 'name', 'description', 'createAt' ], // 要查询的表字段
      orders: [[ 'name', 'desc' ], [ 'id', 'desc' ]] // 排序方式
    };
    const roles = await this.pagination('role', options, page, pageSize);

    return roles;
  }
}

module.exports = RoleService;
