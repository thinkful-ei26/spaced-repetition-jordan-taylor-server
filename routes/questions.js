'use strict';

const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const User = require('../models/userschema');
// const { rotateValues } = require('../linkedList');
const allQuestions = require ('../allQuestions');

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





// router.put('/current', (req, res) => {

//   const userId = req.user.id;
//   let correctAnswer = '';
//   let answeredCorrectly = false; 
//   console.log('request body', req.body);
//   User.findOne({_id:userId})
//     .then(user => {
//       // user.questions = allQuestions.questions;
//       // user.head = 0;
//     const current = user.questions[user.head];
//     correctAnswer = current.answer;
//     console.log(user.questions);
//     console.log(correctAnswer); 
//     console.log('current values before conditionals:', current); 
//     console.log('user before conditionals:', user)
//     user.head = current.next;
//     if (current.answer === req.body.answer) {
//         answeredCorrectly = true;
//         const newQuestionNextValue = user.questions[current.next].next;
//         console.log(newQuestionNextValue);
//         console.log(newQuestionNextValue-1);
//         user.questions.set(current.next, Object.assign({}, user.questions[current.next], {next: 4})); 
//         Object.assign()
//         // user.questions.set([current.next +1].next.set(newQuestionNextValue) ; 
//         current.next += current.m +1;
//         current.m = current.m +1;  
//     }
//     else if (current.answer !== req.body.answer) {
//         current.m = 1; 
//         if(current.score > 0) {
//             current.score -= 1;
//         }
//         user.questions[current.next].next-1;
//         current.next += current.m; 
//     }
//     console.log('current values after conditionals:',current); 
//     // user.head = user.head + 1;
//     // console.log('user questions after conditional:', user.questions); 
//     console.log('user after conditional:', user);
   
//     return user.save();
        
//     })
//     .then(() => res.json({answeredCorrectly, correctAnswer}))
// })

module.exports = router;