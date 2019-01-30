'use strict';

const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const questionsArray = require('../allQuestions');

const defaultQuestionState = {
  question:String, 
  answer:String, 
  memoryStrength:Number, 
  next:Number, 
  correct:Boolean, 
  guessed:Boolean
};

// ===== Define UserSchema & UserModel =====
const schema = new mongoose.Schema({
  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, 
  questions: {type: Array, default: questionsArray }, 
  currentQuestion:{ type:Object }
});

// Transform output during `res.json(data)`, `console.log(data)` etc.
schema.set('toJSON', {
  virtuals: true,
  transform: (doc, result) => {
    delete result._id;
    delete result.__v;
    delete result.password;
  }
});

// Note: Use `function` (not an `arrow function`) to allow setting `this`
schema.methods.validatePassword = function (incomingPassword) {
    return bcrypt.compare(incomingPassword, this.password);
  };
  
schema.statics.hashPassword = function (incomingPassword) {
    const digest = bcrypt.hash(incomingPassword, 10);
    return digest;
  };
// schema.statics.hashPassword = function (pwd) {
//   return bcrypt.hash(pwd, 10);
// };

module.exports = mongoose.model('User', schema);