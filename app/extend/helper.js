const moment = require('moment');
const crypto = require('crypto');
const Captchapng = require('captchapng');
const uuid = require('node-uuid');
const jwt = require('jsonwebtoken');
const Promise = require('bluebird');

const response = (ctx, statusCode, code = '000000', message, data) => {
  ctx.status = statusCode;
  return ctx.body = {
    code,
    message,
    data
  };
};

const cryptoPass = (salt, str) => {
  return crypto
    .createHmac('sha1', salt)
    .update(str)
    .digest('hex');
};

const genCaptcha = (ctx) => {
  const num = parseInt(Math.random() * 9000 + 1000);
  const p = new Captchapng(80, 30, num); // width,height,numeric captcha
  p.color(20, 0, 0, 0); // First color: background (red, green, blue, alpha)
  p.color(80, 70, 70, 255); // Second color: paint (red, green, blue, alpha)
  const uuidStr = uuid.v1().replace(/-/g, '');
  const img = p.getBase64();
  const imgBase64 = 'data:image/png;base64,' + img;

  const retdata = {
    sessionId: uuidStr,
    img: imgBase64
  };
  ctx.app.redis.set(uuidStr, num + '', 'ex', 300);
  return retdata;
};

const sign = (payload, secret, options) => {
  if (options) {
    return jwt.sign(payload, secret, options);
  }
  return jwt.sign(payload, secret);
};

const verify = async(token, secret) => {
  return Promise.fromCallback(callback => {
    jwt.verify(token, secret, callback);
  });
};


module.exports = {
  moment,
  response,
  cryptoPass,
  genCaptcha,
  sign,
  verify
};
