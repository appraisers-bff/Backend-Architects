require('dotenv').config();
const express = require('express');
const auth = require('../users/auth')
const restricted = require('./restricted')
const Houses = require('./house-model')
const db = require('../../data/dbConfig')
const Users = require('../users/users-model')

const router = express.Router();

router.post('/users/:id/house', restricted, async (req, res) => {

})


module.exports = router;