const express = require('express');
const router = express.Router();
const multer = require('multer');
const bookController = require('../controllers/bookController');
const auth = require('../middleware/auth');
const { handleImageUpload } = require('../utils/uploadImage');
const { v4: uuidv4 } = require('uuid');
const storage = multer.memoryStorage();
const upload = multer({ storage });

// GET /api/books - Retrieve a list of all books
router.get('/', auth, bookController.getAllBooks);

// GET /api/books/:id - Retrieve details of a specific book by its ID (includes library, author, borrower)
router.get('/:id', auth, bookController.getBookById);

// // POST /api/books - Create a new book entry (with optional image)
// router.post('/', auth, upload.single('image'), bookController.createBook);
router.post('/', auth,  handleImageUpload , bookController.createBook);

// PUT /api/books/:id - Update details of a specific book
router.put('/:id', auth, bookController.updateBook);

// DELETE /api/books/:id - Delete a book by its ID
router.delete('/:id', auth, bookController.deleteBook);

module.exports = router;
