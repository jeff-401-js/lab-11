'use strict';

const express = require('express');
const authRouter = express.Router();


const User = require('./users-model.js');
const auth = require('./middleware.js');

/**
 * Signup
 * @route GET /{signup}
 * @param {string} signup.path.required - Resource model name
 * @returns {Object} 500 - Server error
 * @returns {Object} 200 - { count: 2, results: [{}, {}]}
 */

authRouter.post('/signup', (req, res, next) => {
  console.log(req.body);
  let user = new User(req.body);
  user.save()
    .then( (user) => {
      req.token = user.generateToken();
      req.user = user;
      res.set('token', req.token);
      res.cookie('auth', req.token);
      res.send(req.token);
    }).catch(next);
});

/**
 * Signin
 * @route GET /{signin}
 * @param {string} signin.path.required - Resource model name
 * @returns {Object} 500 - Server error
 * @returns {Object} 200 - { count: 2, results: [{}, {}]}
 */

authRouter.get('/signin', auth, (req, res) => {
  res.cookie('auth', req.token);
  res.send(req.token);
});

module.exports = authRouter;
