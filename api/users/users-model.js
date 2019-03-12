require('dotenv').config();

const jwt = require('jsonwebtoken');

const db = require('../../data/dbConfig');

module.exports = {
    generateToken,
    add,
    find,
    findById,
    findBy
}

async function add(user) {
    const [id] = await db('users').insert(user);
    return findById(id);
  }

const secret =
  process.env.JWT_SECRET || 'secrets are an illusion'

function generateToken(user) {
    const payload = {
      subject: user.id, 
      username: user.username,
    };
  
    const options = {
      expiresIn: '1d',
    };
  
    return jwt.sign(payload, secret, options);
  } 

  function find() {
    return db('users').select('id', 'first', 'last', 'username', 'email', 'password');
  }

  function findBy(filter) {
    return db('users').where(filter);
  }
  

  function findById(id) {
    return db('users')
      .where({ id })
      .first();
  }