require('dotenv').config();
const axios = require('axios');
const express = require('express');
const auth = require('../users/auth');
const restricted = require('./restricted');
const Houses = require('./house-model');
const db = require('../../data/dbConfig');
const Users = require('../users/users-model');

const router = express.Router();
  
router.post('/house', restricted, (req, res) => {
    const house = req.body
    //make sure zip, bed, bath, sqft, and year are numbers
    if(typeof house.zip !== 'number' || typeof house.bed !== 'number' || typeof house.bath !== 'number' || typeof house.sqft !== 'number' || typeof house.year !== 'number') {
        house.zip = parseInt(house.zip);
        house.bed = parseInt(house.bed);
        house.bath = parseInt(house.bath);
        house.sqft = parseInt(house.sqft);
        house.year = parseInt(house.year);
    }

    //api call to heroku/flask file
    axios.post('https://test-flask-app-api-heroku.herokuapp.com/api', house)
        .then(response => {
            house.fmv = response.data.results[0];
            house.zestimate = response.data.results[1];
            //add house to the database
            Houses.add(house)
                .then(house => {
                    //send the house to the client
                    res.status(201).json(house);
                })
                .catch(err => {
                    res.status(500).json({error: "could not save house at this time"} )
                })
        })
        .catch(err => {
            res.status(500).json({error: "could not properly reach heroku/python script"} )
        })
})

router.get('/house/:id', restricted,  (req, res) => {
    let { id } = req.params
    Houses.findById(id)
      .then(house => {   
        res.status(201).json(house);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });

  router.delete('/house/:id', restricted, async (req, res) => {
    try {
      const count = await Houses.remove(req.params.id);
      if (count > 0) {
        res.status(200).json({ message: 'House has been removed' });
      } else {
        res.status(404).json({ message: 'House could not be found' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Error removing the house',
      });
    }
  });

router.put('/house/:id', restricted, async (req, res) => {
    try {
        let response = await Houses.updateHouse(req.params.id, req.body);
        res.status(200).json({ message: 'House info has been successfully updated' });
    } catch (err) {
        res.status(404).json({
            error: 'Could not find specified house.'
        });
    }
});


// router.post('/user/:id/house', restricted, async (req, res) => { 

//  if (req.body) {
//      try {
//         const user = await Users.findById(req.params.id);
//         if (user.length>0) {
//             try {
//                 const newHouse = { user_id: req.params.id, ...req.body}
//                 const response = await Houses.add(newHouse);
//                 res.status(201).json(response)
//             } catch (err) {
//                 res.status(500).json({error: 'Could not create house'})
//             }
//         } else {
//             res.status(404).json ({message: 'Could not find user'})
//         }

//      } catch (err) {
//          res.status(500).json ({ error: 'Could not access users'})
//      }
//  } else {
//      console.log(req.body)
//      res.status(403).json ({ error: 'Please include required house info'})
//  }
//     }) 

router.get('/user/:id/house', restricted, async (req, res) => {
    try {
        const response = await Houses.getHouseById(req.params.id);

        if (response) {
                res.status(200).json(response);
            } else {
                res.status(403).json({
                    error: 'You are not allowed to see this house'
                });
            }
    } catch (err) {
        res.status(500).json({
            error: 'Could not get the house at this time'
        });
    }
})



module.exports = router;