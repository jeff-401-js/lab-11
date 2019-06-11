'use strict';

/**
 * @module scr/middleware/500
 */

/**
 * @param {Object} err - error object
 * @param {Object} request - request object
 * @param {Object} response - response object
 * @desc server error handler
 * Export object
 * @type {Object}
 */

 
module.exports = (err, req, res) => {
  console.error('__SERVER_ERROR__', err);
  let error = { error: err.message || err };
  res.statusCode = err.status || 500;
  res.statusMessage = err.statusMessage || 'Server Error';
  res.setHeader('Content-Type', 'application/json');
  res.write( JSON.stringify(error) );
  res.end();
};
