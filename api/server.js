const express = require('express');
const middleware = require('../config/middlewareConfig.js')
const usersRouter = require('./users/usersRouter');

const server = express();

middleware(server);

server.use('/api/', usersRouter);

module.exports = server;