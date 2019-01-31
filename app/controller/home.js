'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi, egg';
  }

  async ceshi() {
    await this.ctx.render('ceshi', {});
  }
}

module.exports = HomeController;
