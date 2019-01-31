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

module.exports = {
  ejs,
  io
};
