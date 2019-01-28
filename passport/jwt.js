'use strict';

const passportJWT = require ('passport-jwt');

const{ Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { JWT_SECRET } = require('../config')