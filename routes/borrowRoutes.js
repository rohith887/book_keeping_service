const express = require('express');
const router = express.Router();
const borrowController = require('../controllers/borrowController');
const auth = require('../middleware/auth');

// Borrow a book
router.post('/borrow', auth,borrowController.borrowBook);

// Return a book
router.put('/return/:id',auth,  borrowController.returnBook);

module.exports = router;
