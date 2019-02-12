module.exports = () => {
  return async(ctx, next) => {

    const { socket, logger } = ctx;

    const query = socket.handshake.query; // 获取客户端连接传来的参数

    if (!query.userId) {
      socket.disconnet(); // 授权不通过，断开连接。
      return;
    }

    logger.info('handshake query', query);

    const nsp = socket.nsp;

    logger.info('example namespace', nsp.name);

    nsp.adapter.subClient.on('message', function(channel, message) {
      logger.info('redis channel', channel);
      logger.info('redis message', message);
      nsp.emit('ceshi', 'a user connected');
    });

    nsp.adapter.subClient.subscribe('first channel');

    socket.userId = query.userId;

    socket.emit('ceshi', 'a user connected');

    //nsp.adapter.pubClient.publish('ceshi', 'publish a message');

    await next();
  };
};
