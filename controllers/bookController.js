const Book = require('../models/Book');
const Library = require('../models/Library');
const User = require('../models/User');
// const uploadImage = require('../utils/uploadImage');
const uploadImage = require('../utils/uploadImage');

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().populate('author').populate('library').populate('borrower');
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate('author')
      .populate('library')
      .populate('borrower');
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createBook = async (req, res) => {
  try {
    const { title, author, library } = req.body;
    let Image = '';

    if (req.file) {
      // req.file.filename contains the uploaded file name (if using diskStorage)
      Image = `/uploads/images/${req.file.filename}`;  // or wherever your files are stored
    }

    const book = new Book({ title, author, library, Image });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
