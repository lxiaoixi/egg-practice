module.exports = () => {
  return async function authToken(ctx, next) {
    const { helper, logger, app } = ctx;
    const { config } = app;
    const token = ctx.get('x-auth-token');
    logger.info('x-auth-token is', token);
    if (!token) {
      return helper.response(ctx, 401, 'token is invalid', '111111');
    }
    const payload = await helper.verify(token, config.jwt.secret);
    logger.info('token decode is', payload);
    ctx.state.user = payload.id;
    await next();
  };
};
