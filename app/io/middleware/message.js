module.exports = app => {
  return async(ctx, next) => {
    const { socket, logger } = ctx;

    const query = socket.handshake.query;

    logger.info('handshake query', query);

    socket.emit('ceshi', 'a user connected');

    logger.info('example namespace');

    await next();
  };
};
