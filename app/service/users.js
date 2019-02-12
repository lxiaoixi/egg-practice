const Service = require('egg').Service;

class UserService extends Service {
  async list(page = 1, pageSize = 10) {

    const { app, logger } = this;

    const { mysql, redis } = app;


    await redis.set('user', 'xiaoxi', 'px', 80000);

    const user = await redis.get('user');
    logger.info('redis user', user);

    const users = await mysql.select('users', {
      // where: { id: [ 1, 2 ] },
      columns: [ 'username', 'password' ], // 要查询的表字段
      orders: [[ 'username', 'desc' ], [ 'id', 'desc' ]], // 排序方式
      limit: pageSize, // 返回数据量
      offset: (page - 1) * pageSize
    });

    logger.info('users', users);
    return users;

  }

  async add(user) {
    const { app } = this;

    const { mysql } = app;

    await mysql.insert('users', user);
    return 'success';
  }
}

module.exports = UserService;
