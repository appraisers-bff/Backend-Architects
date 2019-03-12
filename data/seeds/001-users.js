require('dotenv').config();
const bcrypt = require('bcryptjs');

exports.seed = function(knex, Promise) {

  return knex('users')
    .truncate()
    .then(function () {
      return knex('users').insert([
        {
          first: 'Ryan', 
          last: 'Mau',
          username: 'ryan1', 
          email: 'ryan@ryan.com',
          password: bcrypt.hashSync('ryan', 11),
         
        },
        {
          first: 'Danny', 
          last: 'Mau',
          username: 'danny1', 
          email: 'ryan@danny.com',
          password: bcrypt.hashSync('danny', 11),
          
        },
        {
          first: 'Tyler', 
          last: 'Mau',
          username: 'tyler1', 
          email: 'ryan@tyler.com',
          password: bcrypt.hashSync('tyler', 11),
        },
        {
          first: 'Brendan', 
          last: 'Mau',
          username: 'brendan1', 
          email: 'ryan@brendan.com',
          password: bcrypt.hashSync('brendan', 11),
        }
      ]);
    });
};
