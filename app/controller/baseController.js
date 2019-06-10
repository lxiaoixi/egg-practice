const Controller = require('egg').Controller;
// 基类，定义一些公共方法，其它所有类都继承该类
class BaseController extends Controller {

  /**
   *
   * @param {*http状态码,number类型} statusCode
   * @param {*返回码6位数,string类型,success:'000000',fail:错误码，其它6位数} code
   * @param {*操作成功或失败返回的信息} message
   * @param {*success:返回的data数据，fail:错误信息} data
  */

  response(statusCode, code = '000000', message, data) {
    const { ctx } = this;
    ctx.status = statusCode;
    return ctx.body = {
      code,
      message,
      data
    };
  }
}

module.exports = BaseController;
