module.exports = () => {
  return async(ctx, next) => {
    const { socket, logger } = ctx;

    const query = socket.handshake.query;

    logger.info('handshake query', query);

    // socket.emit('ceshi', 'a user connected');

    logger.info('example namespace', socket.nsp.name);

    socket.userId = query.userId;

    socket.emit('ceshi', 'a user connected');

    await next();
  };
};
