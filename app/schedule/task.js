const Subscription = require('egg').Subscription;

class Task extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      cron: '20 19 15 30 1 *', // 1 分钟间隔
      type: 'all' // 指定所有的 worker 都需要执行
    };
  }

  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    this.logger.info('task start');
  }
}

module.exports = Task;
