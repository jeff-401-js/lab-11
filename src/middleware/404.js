'use strict';

/**
* @module scr/middleware/404
 */

/**
* @param {Object} request - request object
* @param {Object} response - response object
* @desc resource error handler
* Export object
* @type {Object}
 */

module.exports = (req,res) => {
  let error = { error: 'Resource Not Found' };
  res.statusCode = 404;
  res.statusMessage = 'Not Found';
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(error));
  res.end();
};
