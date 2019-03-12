require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const auth = require('./auth')
const Users = require('./users-model')
const db = require('../../data/dbConfig')

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Worther Api test');
  });

router.post('/register', (req, res) => {
    const user = req.body;

    const hash = bcrypt.hashSync(user.password, 11); 

    user.password = hash;

    Users.add(user)
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(error => {
        res.status(500).json(error);
      });
})

router.post('/login', (req, res) => {
    let { username, password } = req.body;
  
    Users.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = Users.generateToken(user); 
          res.status(200).json({
            message: `Welcome ${user.username}!, have a token...`,
            token,
          });
        } else {
          res.status(401).json({ message: 'Invalid Credentials' });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });

  router.get('/users', (req, res) => {
    Users.find()
      .then(users => {
        res.json(users);
      })
      .catch(err => res.send(err));
  });

  router.delete('/:id', async (req, res) => {
    try {
      const count = await Users.remove(req.params.id);
      if (count > 0) {
        res.status(200).json({ message: 'User has been removed' });
      } else {
        res.status(404).json({ message: 'User could not be found' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Error removing the user',
      });
    }
  });

  router.put('/users/:id/', auth, async (req, res) => {
    try {
        let response = await Users.updateUser(req.params.id, req.body);
        res.status(200).json(response);
    } catch (err) {
        res.status(404).json({
            error: `Could not find specified user.`
        });
    }
});

module.exports = router;