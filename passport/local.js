<<<<<<< HEAD
'use strict';

const { Strategy: LocalStrategy } = require('passport-local');

const User = require('../models/user');

// ===== Define and create basicStrategy =====
const localStrategy = new LocalStrategy((username, password, done) => {
  let user;
  User.findOne({ username })
    .then(results => {
      user = results;
      if (!user) {
        return Promise.reject({
          reason: 'LoginError',
          message: 'Incorrect username',
          location: 'username'
        });
      }
      return user.validatePassword(password);
    })
    .then(isValid => {
      if (!isValid) {
        return Promise.reject({
          reason: 'LoginError',
          message: 'Incorrect password',
          location: 'password'
        });
      }
      return done(null, user);
    })
    .catch(err => {
      if (err.reason === 'LoginError') {
        return done(null, false);
      }
      return done(err);
    });
});

module.exports = localStrategy;
=======
const { Strategy: LocalStrategy } = require('passport-local');
const User = require('./userschema');

const LocalStrategy = new LocalStrategy((username, password, done)
    => {
        let user; 
        User.findOne({ username })
            .then(results => {
                user = results;
                if (!results){
                    return Promise.reject({
                        reason: 'LoginError',
                        message: 'Incorrect username',
                        location: 'username'
                    })
            }
        const isValid = user.validatePassword(password);
            if (!isValid){
                return Promise.reject({
                    reason: 'LoginError',
                    message: 'Incorrect password',
                    location: 'password'
                });
            }
            return done(null,user);
        })
        .catch(err => {
            if (err.reason === 'LoginErro'){
                return done(null, false);
            }
            return done(err);
        });
    });
>>>>>>> f4e361617902001ec1926cac364ef780c7271417
