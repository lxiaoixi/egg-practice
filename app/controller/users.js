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

    this.response(200, '000000', 'success', list);
  }

  async add() {
    const { ctx, service, logger } = this;

    const body = ctx.request.body;

    logger.info('add user', body);

    await service.users.add(body.user);

    this.response(201, '000000', 'success');
  }

  async signIn() {
    const { ctx, service, logger } = this;

    const body = ctx.request.body;

    logger.info('add user', body);

    const user = await service.users.checkIsExit(body.phone, body.email);
    logger.info('check user is exit', user);
    if (user.length > 0) {
      return this.response(422, '111111', 'the user is exit');
    }

    await service.users.signIn(body);

    this.response(201, '000000', 'success');
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

    this.response(200, '000000', 'success');
  }

  async login() {
    const { ctx, service, logger, config } = this;

    const body = ctx.request.body;

    logger.info('login user', body);

    const { username, password } = body;
    if (!username || !password) {
      return this.response(422, '111111', 'please input username and password');
    }
    // 用户是否存在
    const users = await service.users.checkIsExit('', username);
    if (users.length === 0) {
      return this.response(422, '111111', 'the user is not exit');
    }

    const user = users[0];
    logger.info('current user', user);

    const hash_password = ctx.helper.cryptoPass(user.salt, password);

    if (hash_password !== user.password) {
      return this.response(422, '111111', 'the user password is not correct');
    }

    // JWT TOKEN
    const { jwt: { secret, expiresIn } } = config;
    const token = ctx.helper.sign({ id: user.id }, secret, { expiresIn });

    this.response(201, '000000', 'success', { token });
  }
}

module.exports = UserController;
