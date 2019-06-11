'use strict';

const express = require('express');
const router = express.Router();
const auth = require ('../auth/middleware');


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



// Route Handlers
function handleGetAll(req, res, next) {
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

function handleGetOne(req, res, next) {
  let book = {
    title:'Moby Dick',
  };
  res.status(200).json(book);
}

module.exports = router;
