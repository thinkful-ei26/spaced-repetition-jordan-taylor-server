'use strict';

const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const User = require('../models/userschema');

router.get('/', (req, res, next) => {
    const userId = req.user.id;

    User.find({_id:userId})
      .then(result => {
       return res.json({
           data:{
               questions:result[0].questions, 
               guesses:result[0].guessedQuestions
           }
       });    
      })
      .catch(err => {
        next(err);
      });
});

module.exports = router;