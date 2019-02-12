'use strict';

module.exports = app => {

  const { io } = app;

  io.of('/example').route('exchange', io.controller.nsp.exchange);

};
