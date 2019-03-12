const knex = require('knex');

const db = process.env.ENVIRONMENT || 'development';

const knexConfig = require('../knexfile.js')[db];

module.exports = knex(knexConfig);
