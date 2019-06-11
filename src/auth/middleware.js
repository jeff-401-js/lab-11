'use strict';

const User = require('./users-model.js');

/**
 * @module src/auth/middleware
 */

/**
  * @param {Object} req - request object
  * @param {Object} res - response object
  * @param {function} next - calls next middleware
  * @desc Middleware that performs basic authorization
  */

module.exports = (req, res, next) => {

  try {
    let [authType, authString] = req.headers.authorization.split(/\s+/);

    // BASIC Auth  ... Authorization:Basic ZnJlZDpzYW1wbGU=

    switch(authType.toLowerCase()) {
    case 'basic':
      return _authBasic(authString);
    default:
      return _authError();
    }

  } catch(e) {
    return _authError();
  }

  /**
  * basic authenticate function
  * @param {function} next - calls next middleware
  * @desc Middleware that performs basic authorization
  */

  function _authBasic(authString) {
    let base64Buffer = Buffer.from(authString,'base64'); // <Buffer 01 02...>
    let bufferString = base64Buffer.toString(); // john:mysecret
    let [username,password] = bufferString.split(':'); // variables username="john" and password="mysecret"
    let auth = {username,password}; // {username:"john", password:"mysecret"}

    return User.authenticateBasic(auth)
      .then( user => _authenticate(user) );
  }

  /**
  * basic authenticate user function
  * @param {Object} user - user object
  * @param {function} next - calls next middleware
  * @desc Middleware that performs basic authorization
  */

  function _authenticate(user) {
    if ( user ) {
      req.user = user;
      req.token = user.generateToken();
      next();
    }
    else {
      _authError();
    }
  }

  function _authError() {
    next({status: 401, statusMessage: 'Unauthorized', message: 'Invalid User ID/Password'});
  }

};

