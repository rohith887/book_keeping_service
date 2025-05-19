const express = require('express');
const router = express.Router();
const multer = require('multer');
const inventoryController = require('../controllers/libraryController');
const auth = require('../middleware/auth');
const { handleImageUpload } = require('../utils/uploadImage');
const { v4: uuidv4 } = require('uuid');
const storage = multer.memoryStorage();
const upload = multer({ storage });


router.post('/', inventoryController.createLibrary);
// GET inventory
router.get('/:id/inventory',  inventoryController.getInventory);

// POST a book to inventory
router.post('/:id/inventory',handleImageUpload,inventoryController.addBookToInventory);

// DELETE a book from inventory
router.delete('/:id/inventory/:bookId',  inventoryController.removeBookFromInventory);

module.exports = router;
