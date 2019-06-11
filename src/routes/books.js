'use strict';

const express = require('express');
const router = express.Router();
const auth = require ('../auth/middleware');

/**
 * Router Module (books)
 * Integrates with various models through a common Interface (.get())
 * @module src/routes/books
 */

/**
 * Get a list of books for model provided
 * @route GET /{books}
 * @param {string} books.path.required - Resource model name
 * @returns {Object} 500 - Server error
 * @returns {Object} 200 - { count: 2, results: [{}, {}]}
 */

router.get('/books', auth, handleGetAll);

/**
 * Get a list of records for book id provided
 * @route GET /{books}/{id}
 * @param {string} book.path.required - Resource model name
 * @param {number} id.path.required - Resource model name
 * @returns {Object} 500 - Server error
 * @returns {Object} 200 - { count: 2, results: [{}, {}]}
 */

router.get('/books/:id',auth, handleGetOne);


/**
   * @function handleGetAll
   * @param {object} request - request object
   * @param {object} response - response object
   * @param {function} next - calls next middleware
   * @desc Middleware that handles get all route call
   */

// Route Handlers
function handleGetAll(req, res) {
  let books = {
    count: 3,
    results: [
      { title:'Moby Dick' },
      { title:'Little Women' },
      { title: 'Eloquent Javascript' },
    ],
  };
  res.status(200).json(books);
}

/**
   * @function handleGetOne
   * @param {object} request - request object
   * @param {object} response - response object
   * @param {function} next - calls next middleware
   * @desc Middleware that handles get one call
   */

function handleGetOne(req, res) {
  let book = {
    title:'Moby Dick',
  };
  res.status(200).json(book);
}

/**
* Export object with app and start methods attached
* @type {Object}
 */

module.exports = router;
