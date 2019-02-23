const Controller = require('./baseController');

class RoleController extends Controller {

  async add() {
    const { ctx, service, logger } = this;

    const data = ctx.request.body;
    logger.info('add role', data);

    if (!data.name) {
      return this.response(422, 'role name is null', '111111');
    }

    const role = await service.roles.checkIsExit(data.name);

    if (role) {
      return this.response(422, 'role is exit', '111111');
    }

    await service.roles.add(data);

    this.response(201, 'success', '000000');
  }

  async list() {
    const { ctx, service, logger } = this;

    const data = ctx.query;
    logger.info('get role list query', data);

    const roles = await service.roles.list(data);
    this.response(200, roles, '000000');
  }
}

module.exports = RoleController;
