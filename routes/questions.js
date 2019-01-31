'use strict';

const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const User = require('../models/userschema');
// const { rotateValues } = require('../linkedList');
const user = require ('../allQuestions');

// router.get('/', (req, res, next) => {
//     const userId = req.user.id;

//     User.find({_id:userId})
//       .then(result => {
//        return res.json({
//             data: {
//                current:result[0].currentQuestion.head.value,
//                next:result[0].currentQuestion.head.next.value
//             }
//        });    
//       })
//       .catch(err => {
//         next(err);
//       });
// });

router.get('/', (req, res, next) => {
  const userId = req.user.id;

  User.findOne({_id:userId})
    .then(user => {
      // console.log('user on get:', user)
      console.log('user questions:', user.questions);
     return res.json(user.questions);    
    })
    .catch(err => {
      next(err);
    });
});

router.put('/current', (req, res) => {
  console.log(req.user)

  const userId = req.user.id;
  let correctAnswer = '';
  let answeredCorrectly = false; 

  User.findOne({_id:userId})
    .then(user => {
      // console.log('user:', user)
      const current = user.questions[user.head];
      correctAnswer = current.answer;

      if (current.answer === req.body.answer){
        answeredCorrectly = true;
        current.score += 1;
      }

      user.head = user.head + 1;
      console.log('user:', user)
      return user.save();
        
    })
    .then(() => res.json({answeredCorrectly, correctAnswer}))
})

// router.put('/current', (req, res, next) => {
//   //get the answer that the user sent
//   let { answer } = req.body.answer
//   let userId = req.user.id;
//   let toUpdate;
  

  //compare that with the correct answer from the current question
  // User.find({_id:userId})
  //     .then(result => {
  //       if(result[0].head.value.answer === answer) {
  //         result[0].currentQuestion.head.value.guessAttempts++
  //         result[0].currentQuestion.head.value.memoryStrength++

  //         let update = { '$set': {} };
  //         let index = result[0].currentQuestion.head.next.value - 1
  //         let currentHead = result[0].currentQuestion.head.value
  //         let temp = result[0].currentQuestion.head.next.value

  //         // console.log('Correct!')
  //         // console.log(currentHead)

  //         // currentHead = temp
  //         // console.log(currentHead), result[0]
  //       }

  //         currentHead = temp
  //         update['$set'][currentHead + index] = toUpdate;

  //         console.log(currentHead), result[0]
  //       }  
  //       else {
  //         result[0].currentQuestion.head.value.memoryStrength--
  //         result[0].currentQuestion.head.value.guessAttempts++

  //         // let currentHead = result[0].currentQuestion.head.value
  //         // let temp = result[0].currentQuestion.head.next.value

  //         // console.log('Incorrect')
  //         // console.log(currentHead)

  //         // currentHead = temp
  //         // console.log(currentHead), result[0]
  //       }

  //       // rotateValues(result[0].currentQuestion);
  //       // console.log(result[0].currentQuestion.head.value);
  //       return res.json(
  //         rotateValues(result[0].currentQuestion)
  //       ) 
  //     })
  //     .catch(err => {
  //       next(err);
  //     });

  // User.findOneAndUpdate({_id:userId}, toUpdate)
  //     .then(data => {
  //       res.json(data)
  //     })

  //update the linked list accordingly *v1, move current one over*


module.exports = router;