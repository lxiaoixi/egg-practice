'use strict';

module.exports = appInfo => {
  return {
    keys: appInfo.name + '_xiaoxi',
    // 模板引擎
    view: {
      defaultViewEngine: 'ejs',
      mapping: {
        '.ejs': 'ejs'
      },
      defaultExtension: '.ejs'
    },
    // 中间件 middleware
    middleware: [ 'robot' ],

    bodyParser: {
      jsonLimit: '1mb',
      formLimit: '1mb'
    },

    // robot config
    robot: {
      ua: [
        /Baiduspider/i
      ]
    },
    // gzip config
    gzip: {
      threshold: 1024
    },
    // news config
    news: {
      pageSize: 10,
      serverUrl: 'https://hn.algolia.com/api/v1'
    },

    io: {
      init: { }, // passed to engine.io
      namespace: { // 定义命名空间
        '/haha': {
          connectionMiddleware: [ 'message' ],
          packetMiddleware: []
        },
        '/example': {
          connectionMiddleware: [ 'message' ],
          packetMiddleware: []
        }
      },
      // cluster 模式下，通过 redis 实现数据共享
      redis: {
        host: '127.0.0.1',
        port: 6379,
        db: 10
      }
    },

    mysql: {
      // 单数据库信息配置
      client: {
        // host
        host: '127.0.0.1',
        // 端口号
        port: '3306',
        // 用户名
        user: 'xiaoxi',
        // 密码
        password: 'xiaoxi',
        // 数据库名
        database: 'xiaoxi'
      },
      // 是否加载到 app 上，默认开启
      app: true,
      // 是否加载到 agent 上，默认关闭
      agent: false
    },
    redis: {
      client: {
        port: 6379, // Redis port
        host: '127.0.0.1', // Redis host
        password: 'nMe_2o1701241438',
        db: 10,
        keyPrefix: 'ioredis' // 设置redis 的key的前缀
      }
    }
  };
};
