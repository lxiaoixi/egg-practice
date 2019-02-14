'use strict';

// had enabled by egg
// exports.static = true;

// 模板引擎
const ejs = {
  enable: true,
  package: 'egg-view-ejs'
};

const io = {
  enable: true,
  package: 'egg-socket.io'
};

const routerPlus = {
  enable: true,
  package: 'egg-router-plus'
};

const mysql = {
  enable: true,
  package: 'egg-mysql'
};

const redis = {
  enable: true,
  package: 'egg-redis'
};

const validate = {
  enable: true,
  package: 'egg-validate'
};

module.exports = {
  ejs,
  io,
  routerPlus,
  mysql,
  redis,
  validate
};
