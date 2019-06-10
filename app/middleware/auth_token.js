module.exports = () => {
  return async function authToken(ctx, next) {
    const { helper, logger, app } = ctx;
    const { config } = app;

    try {
      const token = ctx.get('x-auth-token');
      logger.info('x-auth-token is', token);
      if (!token) {
        return helper.response(ctx, 401, '111111', 'token is invalid');
      }
      const payload = await helper.verify(token, config.jwt.secret);
      logger.info('token decode is', payload);
      ctx.state.user = payload.id;
      await next();
    } catch (e) {
      logger.info('token auth error', e);
      return helper.response(ctx, 401, '111111', 'token is expired');
    }
  };
};
