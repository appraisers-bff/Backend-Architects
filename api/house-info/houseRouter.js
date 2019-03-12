require('dotenv').config();
const express = require('express');
const auth = require('../users/auth')
const restricted = require('./restricted')
const Houses = require('./house-model')
const db = require('../../data/dbConfig')
const Users = require('../users/users-model')

const router = express.Router();


  

router.post('/house', (req, res) => {
    const house = req.body
    Houses.add(house)
    .then(id=> {
        console.log(id)
        Houses.findById(id)
        res.status(201).json(id)
    })
    .catch(err => {
        res.status(500).json({error: "could not save house at this time"} )
    })
})

router.get('/house/:id', (req, res) => {
    let { id } = req.body 
    Houses.findById(id)
      .then(house => {
        res.status(201).json(house);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });

router.post('/user/:id/house', restricted, async (req, res) => { 

 if (req.body.length > 0) {
     try {
        const user = await Users.findById(req.params.id);
        if (user.length>0) {
            try {
                const newHouse = { user_id: req.params.id, ...req.body}
                const response = await Houses.add(newHouse);
                res.status(201).json(response)
            } catch (err) {
                res.status(500).json({error: 'Could not create house'})
            }
        } else {
            res.status(404).json ({message: 'Could not find user'})
        }

     } catch (err) {
         res.status(500).json ({ error: 'Could not access users'})
     }
 } else {
     console.log(reg.body)
     res.status(403).json ({ error: 'Please include required house info'})
 }
    }) 

// router.get('/user/:id/house', restricted, async (req, res))



module.exports = router;