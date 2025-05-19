const Book = require('../models/Book');

exports.borrowBook = async (req, res) => {
  try {
    const { bookId } = req.body;
    const userId = req.user._id;

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: req.__('book.not_found') });
    }

    if (book.borrower) {
      return res.status(400).json({ message: req.__('book.already_borrowed') });
    }

    book.borrower = userId;
    await book.save();

    res.status(200).json({ message: req.__('book.borrowed_successfully'), book });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.returnBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: req.__('book.not_found') });
    }

    if (!book.borrower) {
      return res.status(400).json({ message: req.__('book.not_borrowed') });
    }

    book.borrower = null;
    await book.save();

    res.status(200).json({ message: req.__('book.return_successful'), book });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
