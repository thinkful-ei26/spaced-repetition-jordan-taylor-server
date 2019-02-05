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

  const userId = req.user.id;
  let correctAnswer = '';
  let answeredCorrectly = false; 
  let addingMasteredWord = '';
  let allMasteredWords = [];
  let attemptsForTheCurrentWord = 0;
  let numberOfCorrectGuessesForCurrentWord = 0;
  console.log('request body', req.body);
  User.findOne({_id:userId})
    .then(user => {
      // user.questions = allQuestions.questions;
      // user.head = 0;
      // user.masteredWords = [];
  user.questions[user.head].attempts = user.questions[user.head].attempts +1;
  user.questions.set(0, user.questions[user.head]);
  
  if(user.questions[user.head].answer === req.body.answer){
    correctAnswer = user.questions[user.head].answer; 
    answeredCorrectly = true;
    user.questions[user.head].score = user.questions[user.head].score +1; 
    user.questions.set(0, user.questions[user.head]);
    
  }
   console.log(user.questions[user.head].m +1); 
   console.log('length:', parseInt(user.questions.length));
    if(user.questions[user.head].m+1 === user.questions.length || user.questions[user.head].m+1 === user.questions.length-1 && user.questions[user.head].answer === req.body.answer) {
      let index = user.questions.indexOf(undefined);
      addingMasteredWord = user.questions[user.head].text; 
     
      user.masteredWords.push(addingMasteredWord);
      console.log(index);  

      

      user.questions.shift();

      console.log('after removing null values:', user.questions);
      let length = user.questions.length;
      console.log('"length" value:', length);
      let adjustedArray = user.questions.map(question => {

        if(question.next > length+1 ) {
          question.next = question.next -1;
        }
        question.next = question.next -1; 
        if(question.m >= length/2 && question.m > 1) {
          question.m = question.m-1;
        }
        return question;
      });
     
      console.log('adjusted array from map:', adjustedArray);
      user.questions = adjustedArray
      console.log('adjusted user array:', user.questions);
    }
    console.log('new head after adjustment', user.questions[user.head]);
    
  
    console.log('user before conditionals:', user);
    const tempObj1 = user.questions[user.head];
    const current = user.questions[user.head];
    console.log('current values before conditionals:', current); 
    
    console.log(correctAnswer);
    if (correctAnswer === req.body.answer && user.questions[user.head].m+1 !== user.questions.length && user.questions[user.head].m+2 !== user.questions.length) {


        current.m = current.m *2;  
        
         
        tempObj1.m*2;
        tempObj1.next += tempObj1.m;
        for(let i=1; i<=current.m; i++) {
          console.log(user.questions[i]);
          if(i < user.questions.length) {
            user.questions[i].next = user.questions[i].next-1; 
            user.questions.set(user.questions[i].next-1, user.questions[i])
          }
        }
        user.questions.set(tempObj1.m, tempObj1);
      }

      else{user.questions[0].m = 1};
    console.log('user after conditional:', user);
    allMasteredWords = user.masteredWords;
    numberOfCorrectGuessesForCurrentWord = user.questions[0].score;
    attemptsForTheCurrentWord = user.questions[0].attempts;
    return user.save();
        
    })
    .then(() => res.json({answeredCorrectly, correctAnswer, allMasteredWords, attemptsForTheCurrentWord, numberOfCorrectGuessesForCurrentWord}))
})

module.exports = router;