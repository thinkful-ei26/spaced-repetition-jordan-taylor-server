'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
// const user = require('./models/userschema');
const passport = require('passport');
const localStrategy = require('./passport/local');
const bodyParser = require('body-parser');
const { PORT, CLIENT_ORIGIN } = require('./config');
const { dbConnect } = require('./db-mongoose');
// const {dbConnect} = require('./db-knex');

const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');


const app = express();
passport.use(localStrategy);

app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test'
  })
);

app.use(bodyParser.json());

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

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
