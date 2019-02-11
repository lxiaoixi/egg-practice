# egg-born

first egg project

## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org

## static 静态资源

内置了 static 插件, static 插件默认映射 /public/* -> app/public/* 目录

如下：
http://127.0.0.1:7001/public/img/1.jpg

## 模板引擎

* 安装

npm i egg-view-ejs --save

* 开启插件
```
// config/plugin.js
exports.ejs = {
  enable: true,
  package: 'egg-view-ejs'
};
```
* 插件配置
```
// config/config.default.js
exports.view = {
  defaultViewEngine: 'ejs',   //默认使用ejs模板引擎
  mapping: {
    '.html': 'ejs',  // 默认文件后缀为html,映射为ejs
  },
  defaultExtension: '.ejs'  //在render时省略文件后缀
};
```

* 在模板里面访问 helper 对象

{{ helper.relativeTime(item.time) }}

## Context  ctx

* Controller 层  this.ctx
* Service 层 this.ctx
* middleware 层 this.ctx
* helper this.ctx

## 扩展 extend 工具类  app/extend  Helper

通过 ctx.helper 访问到 helper 对象

## 中间件 middleware

> 约定一个中间件是一个放置在 app/middleware 目录下的单独文件。需要 exports 一个普通的 function，接受两个参数：
options: 中间件的配置项，框架会将 app.config[${middlewareName}] 传递进来。options == this.config[middlewareName]
app: 当前应用 Application 的实例。

* 中间件配置

```
// config/config.default.js
// add middleware robot
exports.middleware = [
  'robot',
  'gzip'
];
```
数组顺序即为中间件加载顺序

上述中间件配置是全局的，每次请求都会经过这些中间件

针对单个路由使用中间件，可以直接在 app/router.js 中实例化和挂载，如下：
通过app.middleware 获取中间件函数。

module.exports = app => {
  const gzip = app.middleware.gzip({ threshold: 1024 });
  app.router.get('/needgzip', gzip, app.controller.handler);
};

* 通用配置

enable：控制中间件是否开启。
match：设置只有符合某些规则的请求才会经过这个中间件。
ignore：设置符合某些规则的请求不经过这个中间件。

gzip 只针对 /static 前缀开头的 url 请求开启，我们可以配置 match 选项

module.exports = {
  gzip: {
    match: '/static',  // 支持字符串（字符串数组）、正则、函数
  },
};


## 配置文件 config

this.config

config
|- config.default.js  // 默认的配置文件，所有环境都会加载这个配置文件
|- config.prod.js
|- config.unittest.js
`- config.local.js

当指定 env 时会同时加载对应的配置文件，并覆盖默认配置文件的同名配置。如 prod 环境会加载 config.prod.js 和 config.default.js 文件，config.prod.js 会覆盖 config.default.js 的同名配置。

## 单元测试  

以.test.js 为后缀，即 {app_root}/test/**/*.test.js。

## 日志

ctx.logger
this.logger

## 参数获取

ctx.query 
ctx.queries
   /posts?category=egg&id=1&id=2&id=3  

   ctx.queries 会将相同的key的值放到一个数组中  id: [ '1', '2', '3' ]
ctx.request.body
ctx.params
ctx.headers
ctx.get(name):获取请求 header 中的一个字段的值
ctx.ip
ctx.cookies.get/set
ctx.session

## 参数校验

 Validate 插件
 https://github.com/eggjs/egg-validate

## 路由分发

使用egg-router-plus 路由前缀

## 数据库 mysql  基于mysql

* 开启插件
```
// config/plugin.js
exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};
```

* 添加配置
```
// config/config.${env}.js
exports.mysql = {
  // 单数据库信息配置
  client: {
    // host
    host: 'mysql.com',
    // 端口号
    port: '3306',
    // 用户名
    user: 'test_user',
    // 密码
    password: 'test_password',
    // 数据库名
    database: 'test',
  },
  // 是否加载到 app 上，默认开启
  app: true,
  // 是否加载到 agent 上，默认关闭
  agent: false,
};
```

* app.mysql;

## redis  基于ioredis

* 开启插件

```
exports.redis = {
  enable: true,
  package: 'egg-redis',
};
```

* 添加配置

```
config.redis = {
  client: {
    port: 6379,          // Redis port
    host: '127.0.0.1',   // Redis host
    password: 'auth',
    db: 0,
  },
}
```

* app.redis;
