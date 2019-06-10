const Controller = require('./baseController');

class RoleController extends Controller {

  async add() {
    const { ctx, service, logger } = this;

    const data = ctx.request.body;
    logger.info('add role', data);

    if (!data.name) {
      return this.response(422, '111111', 'role name is null');
    }

    const role = await service.roles.checkIsExit(data.name);

    if (role) {
      return this.response(422, '111111', 'role is exit');
    }

    await service.roles.add(data);

    this.response(201, '000000', 'success');
  }

  async list() {
    const { ctx, service, logger } = this;

    const data = ctx.query;
    logger.info('get role list query', data);

    const roles = await service.roles.list(data);
    this.response(200, '000000', 'success', roles);
  }
}

module.exports = RoleController;
