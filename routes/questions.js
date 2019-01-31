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
               current:result[0].currentQuestion.head.value,
               next:result[0].currentQuestion.head.next.value
       });    
      })
      .catch(err => {
        next(err);
      });
});

router.put('/', (req, res, next) => {
  //get the answer that the user sent
  let answer = req.body.answer
  let userId = req.user.id;
  console.log(answer)
  
  //compare that with the correct answer from the current question
  User.find({_id:userId})
      .then(result => {

        if(result[0].currentQuestion.head.value.answer === answer){
          result[0].currentQuestion.head.value.guessAttempts++
          result[0].currentQuestion.head.value.memoryStrength++

          let currentHead = result[0].currentQuestion.head.value
          let temp = result[0].currentQuestion.head.next.value

          console.log('Correct!')
          console.log(result[0].currentQuestion.head.value.guessAttempts++)
          console.log(currentHead)

          currentHead = temp

          return (
            console.log(currentHead), result[0]
          )
        }  
        else {
          result[0].currentQuestion.head.value.memoryStrength--
          console.log('Incorrect')
        }
        return res.json({
        }) 
      })
      .catch(err => {
        next(err);
      });

  //update the linked list accordingly *v1, move current one over*


})

module.exports = router;