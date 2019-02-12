const Controller = require('egg').Controller;

class NspController extends Controller {
  async exchange() {
    const { ctx } = this;

    const { socket, logger } = ctx;

    // 接收客户端信息
    const message = ctx.args[0] || {};

    logger.info('nsp controller', message);

    // logger.info('current socket', socket);

    await socket.emit('res', `Hi! I've got your message: ${message}`);

  }
}

module.exports = NspController;
