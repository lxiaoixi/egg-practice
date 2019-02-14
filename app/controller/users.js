'use strict';

const Controller = require('./baseController');

class UserController extends Controller {

  async list() {
    const { ctx, service, logger, config, app } = this; // ctx,app,service,logger,config

    const page = ctx.query.page || 1;
    const pageSize = ctx.query.pageSize || config.page.pageSize;

    const list = await service.users.list(page, pageSize);

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

  async signIn() {
    const { ctx, service, logger } = this;

    const body = ctx.request.body;

    logger.info('add user', body);

    const user = await service.users.checkIsExit(body.phone, body.email);
    logger.info('check user is exit', user);
    if (user.length > 0) {
      return this.response(422, 'the user is exit', '111111');
    }

    await service.users.signIn(body);

    this.response(201, 'success', '000000');
  }

  async captcha() {
    const { ctx, service, logger } = this;

    const { phone } = ctx.query;

    if (!phone) {
      return this.response(401, '请输入手机号', '100001');
    }

    logger.info('phone number', phone);
    logger.info('csrf token is', ctx.csrf);
    await service.users.captcha(phone);

    this.response(200, 'success', '000000');
  }

  async login() {
    const { ctx, service, logger, config } = this;

    const body = ctx.request.body;

    logger.info('login user', body);

    const { username, password } = body;
    if (!username || !password) {
      return this.response(422, 'please input username and password', '111111');
    }
    // 用户是否存在
    const users = await service.users.checkIsExit('', username);
    if (users.length === 0) {
      return this.response(422, 'the user is not exit', '111111');
    }

    const user = users[0];
    logger.info('current user', user);

    const hash_password = ctx.helper.cryptoPass(user.salt, password);

    if (hash_password !== user.password) {
      return this.response(422, 'the user password is not correct', '111111');
    }

    // JWT TOKEN
    const { jwt: { secret, expiresIn } } = config;
    const token = ctx.helper.sign({ id: user.id }, secret, { expiresIn });

    this.response(201, { token }, '000000');
  }
}

module.exports = UserController;
