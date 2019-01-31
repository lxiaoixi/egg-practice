const Controller = require('egg').Controller;

class NspController extends Controller {
  async exchange() {
    const { app, ctx } = this;

    const { socket, logger } = ctx;
    logger.info('nsp controller');

    socket.emit('haha', 'nsp controller');


  }
}

module.exports = NspController;
