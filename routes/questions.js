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
               current:result[0].currentQuestion.head
           }
       });    
      })
      .catch(err => {
        next(err);
      });
});

router.put('/:id', (req, res, next) => {
    const { id } = req.params;
    const { currentQuestion } = req.body;
    const userId = req.user.id;
  
    /***** Never trust users - validate input *****/
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const err = new Error('The `id` is not valid');
      err.status = 400;
      return next(err);
    }
  
    if (!currentQuestion) {
      const err = new Error('Missing `guessed Questions` in request body');
      err.status = 400;
      return next(err);
    }
  
    const updateUser = {currentQuestion, userId };
  
    User.findByIdAndUpdate(id, updateUser, { new: true })
      .then(result => {
        if (result) {
          res.json(result);
        } else {
          next();
        }
      })
      .catch(err => {
        if (err.code === 11000) {
          err = new Error('Tag name already exists');
          err.status = 400;
        }
        next(err);
      });
});

module.exports = router;