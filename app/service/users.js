const Service = require('./baseService');

class UserService extends Service {
  async list(page = 1, pageSize = 10) {

    const { app, logger } = this;
    const { redis } = app;

    await redis.set('user', 'xiaoxi', 'px', 80000);

    const user = await redis.get('user');
    logger.info('redis user', user);

    const options = {
      // where: { id: [ 1, 2 ] },
      columns: [ 'id', 'userName', 'nickName', 'email', 'phone', 'createAt' ], // 要查询的表字段
      orders: [[ 'username', 'desc' ], [ 'id', 'desc' ]] // 排序方式
    };
    const users = await this.pagination('user', options, page, pageSize);

    return users;
  }

  async add(user) {
    const { app } = this;

    const { mysql } = app;

    await mysql.insert('users', user);
    return 'success';
  }

  async captcha(phone) {
    const { app, logger } = this;
    const { redis } = app;

    const code = Math.round(Math.random() * 9000 + 1000);
    logger.info('the captcha code is', code);

    // TODO 将验证码发送到手机
    await redis.set(phone, code, 'ex', 100);
    return code;
  }

  async checkIsExit(phone, email) {
    const { app } = this;
    const { mysql } = app;

    const sqlStr = `SELECT * FROM user where phone = ?
    UNION All SELECT * FROM user where email = ?`;
    const values = [ phone, email ];

    return await mysql.query(sqlStr, values);
  }

  async signIn(body) {
    const { app, logger, ctx: { helper } } = this;
    const { mysql } = app;

    const user = Object.assign(body);
    const salt = Math.round((new Date().valueOf() * Math.random())) + '';
    const password = helper.cryptoPass(salt, user.password);
    delete user.repassword;
    delete user.code;
    user.salt = salt;
    user.password = password;
    user.createAt = new Date();

    logger.info('sign user is', user);

    await mysql.insert('user', user);
  }
}

module.exports = UserService;
