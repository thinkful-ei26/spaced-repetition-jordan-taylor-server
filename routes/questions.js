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

// router.put('/current', (req, res) => {
//   console.log(req.user)

//   const userId = req.user.id;
//   let correctAnswer = '';
//   let answeredCorrectly = false; 

//   User.findOne({_id:userId})
//     .then(user => {
//       // console.log('user:', user)
//       const current = user.questions[user.head];
//       correctAnswer = current.answer;

//       if (current.answer === req.body.answer) {
//         answeredCorrectly = true;
//         current.score += 1;
//       }

//       user.head = user.head + 1;
//       console.log('user:', user)
//       return user.save();    
//     })
//     .then(() => res.json({answeredCorrectly, correctAnswer}))
// })





router.put('/current', (req, res) => {

  const userId = req.user.id;
  let correctAnswer = '';
  let answeredCorrectly = false; 
  let addingMasteredWord = '';
  console.log('request body', req.body);
  User.findOne({_id:userId})
    .then(user => {
      // user.questions =[ { text: 'angi', answer: 'vessel', score: 0, m: 7, next: 1 },
      // { text: 'oma', answer: 'tumor', score: 0, m: 7, next: 2 },
      // { text: 'nephr', answer: 'kidney', score: 0, m: 7, next: 3 },
      // { text: 'hepat', answer: 'liver', score: 0, m: 7, next: 4 },
      // { text: 'athr', answer: 'joint', score: 0, m: 7, next: 5 },
      // { text: 'blephar', answer: 'eyelid', score: 0, m: 7, next: 6 },
      // { text: 'ologist', answer: 'specialist', score: 0, m: 7, next: 7 },
      // { text: 'malacia', answer: 'soft', score: 0, m: 7, next: 8 },
      // { text: 'aden', answer: 'gland', score: 0, m: 8, next: 9 } ];
      // user.head = 0;
  //     let adjustedArray = user.questions.map(question => {
  //       let i=0; 
  //       if(question === null){
  //         user.questions.splice(i,1);
  //       }
  //       if(question.next < i ) {
  //         question.next = question.next -1;
  //       }
  //       question.next = question.next -1; 
  //       if(question.m <= i/2 ) {
  //         question.m = question.m-1;
  //       }
  //       return question;
  //     });
  if(user.questions[user.head].answer === req.body.answer){
    correctAnswer = user.questions[user.head].answer; 
    answeredCorrectly = true;
  }
   console.log(user.questions[user.head].m +1); 
   console.log('length:', parseInt(user.questions.length));
    if(user.questions[user.head].m+1 === user.questions.length || user.questions[user.head].m+1 === user.questions.length-1 && user.questions[user.head].answer === req.body.answer) {
      let index = user.questions.indexOf(undefined);
      addingMasteredWord = user.questions[user.head].text; 
     
      const masteredWordsIndex = user.masteredWords.length;  
      user.masteredWords.set(masteredWordsIndex, addingMasteredWord);
      console.log(index);  
      // user.questions.splice(index,1); 
      

      user.questions.shift();
      // user.questions.pop();
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

    // else if (current.answer !== req.body.answer) {
    //     current.m = 1; 
    //     if(current.score > 0) {
    //         current.score -= 1;
    //     }
    //     user.questions[current.next].next-1;
    //     current.next += current.m; 
    // }
    console.log('user after conditional:', user);

   
    return user.save();
        
    })
    .then(() => res.json({answeredCorrectly, correctAnswer, addingMasteredWord}))
})

module.exports = router;