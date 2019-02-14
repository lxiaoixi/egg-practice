module.exports = () => {
  return async function signIn(ctx, next) {

    const { logger, helper, app } = ctx;
    const { redis } = app;

    const { phone, code } = ctx.request.body;

    logger.info('user sign in ', ctx.request.body);

    // 校验参数是否正确;
    ctx.validate({
      email: { type: 'email' },
      password: {
        type: 'password',
        compare: 'repassword'
      },
      phone: { type: 'string' },
      code: { type: 'string', message: '请输入code' }
    });

    // 校验验证码是否正确
    const realCode = await redis.get(phone);
    logger.info('real code is ', realCode);

    if (realCode && realCode === code) {
      redis.del(phone);
      await next();
    } else {
      return helper.response(ctx, 401, '验证码不正确', '111111');
    }
  };
};
