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
            data: {
               current:result[0].currentQuestion.head.value,
               next:result[0].currentQuestion.head.next.value
            }
       });    
      })
      .catch(err => {
        next(err);
      });
});

router.put('/current', (req, res, next) => {
  //get the answer that the user sent
  let { answer } = req.body.answer
  let userId = req.user.id;
  let toUpdate;
  

  //compare that with the correct answer from the current question
  User.find({_id:userId})
      .then(result => {
        if(result[0].currentQuestion.head.value.answer === answer){
          result[0].currentQuestion.head.value.guessAttempts++
          result[0].currentQuestion.head.value.memoryStrength++

          let update = { '$set': {} };
          let index = result[0].currentQuestion.head.next.value - 1
          let currentHead = result[0].currentQuestion.head.value
          let temp = result[0].currentQuestion.head.next.value

          console.log('Correct!')
          console.log(currentHead)

          currentHead = temp
          update['$set'][currentHead + index] = toUpdate;

          console.log(currentHead), result[0]
        }  
        else {
          result[0].currentQuestion.head.value.memoryStrength--
          result[0].currentQuestion.head.value.guessAttempts++

          let currentHead = result[0].currentQuestion.head.value
          let temp = result[0].currentQuestion.head.next.value

          console.log('Incorrect')
          console.log(currentHead)

          currentHead = temp
          console.log(currentHead), result[0]
        }
        return res.json({
          current:result[0].currentQuestion.head.next.value
        }) 
      })
      .catch(err => {
        next(err);
      });

  User.findOneAndUpdate({_id:userId}, toUpdate)
      .then(data => {
        res.json(data)
      })

  //update the linked list accordingly *v1, move current one over*


})

module.exports = router;