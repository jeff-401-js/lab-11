'use strict';

/**
* @module src/auth/user-model
 */


const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
* @typeof users-model
* @property {schema} - model schema
 */

const users = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  email: {type: String},
  role: {type: String, required:true, default:'user', enum:['admin','editor','user'] },
});

/**
* pre-save method
* @param {function} - before save middleware
* @desc Before saving password, hash it
 */

users.pre('save', function(next) {
  bcrypt.hash(this.password,10)
    .then(hashedPassword => {
      this.password = hashedPassword;
      next();
    })
    .catch( error => {throw error;} );
});

/**
* authenticateBasic
* @param {function} - basic authenticate
 */

users.statics.authenticateBasic = function(auth) {
  let query = {username:auth.username};
  return this.findOne(query)
    .then(user => user && user.comparePassword(auth.password))
    .catch(console.error);
};

/**
* compare Password
* @param {function} - Compare a plain text password against the hashed one we have saved
 */

// Compare a plain text password against the hashed one we have saved
users.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.password)
    .then(valid => valid ? this : null);
};

/**
* generateToken
* @param {function} - generate JWT from the user id and a secret
 */

// Generate a JWT from the user id and a secret
users.methods.generateToken = function() {
  let tokenData = {
    id:this._id,
    capabilities: (this.acl && this.acl.capabilities) || [],
  };
  return jwt.sign(tokenData, process.env.SECRET || 'changeit' );
};

/**
* Export Object
* @type {Object}
 */

module.exports = mongoose.model('users', users);
