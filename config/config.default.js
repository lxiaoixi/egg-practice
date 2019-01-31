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
      pageSize: 30,
      serverUrl: 'https://hn.algolia.com/api/v1'
    },

    io: {
      init: { }, // passed to engine.io
      namespace: {
        '/haha': {
          connectionMiddleware: [ 'message' ],
          packetMiddleware: []
        },
        '/example': {
          connectionMiddleware: [ 'message' ],
          packetMiddleware: []
        }
      }
    }
  };
};
