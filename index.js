'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
// const mongoose = require('mongoose');
const passport = require('passport');

const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');

const localStrategy = require('./passport/local');
const jwtStrategy = require('./passport/jwt');
const { PORT, CLIENT_ORIGIN } = require('./config');
const { dbConnect } = require('./db-mongoose');

const app = express();

app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test'
  })
);

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

// Utilize the given `strategy`
passport.use(localStrategy);
passport.use(jwtStrategy);

//Protect endpoints using JWT Strategy
const jwtAuth = passport.authenticate('jwt', { session: false, failWithError: true });

// Mount routers
app.use('/api/users', usersRouter);
app.use('/api', authRouter);

function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
}

if (require.main === module) {
  dbConnect();
  runServer();
}

module.exports = { app };
