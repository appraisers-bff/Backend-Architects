const express = require('express');
const middleware = require('../config/middlewareConfig.js')
const usersRouter = require('./users/usersRouter');
const houseRouter = require('../api/house-info/houseRouter')

const server = express();

middleware(server);

server.use('/api/', usersRouter, houseRouter);

module.exports = server;