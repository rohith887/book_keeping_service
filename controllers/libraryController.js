const Library = require('../models/Library');
const Book = require('../models/Book');

exports.createLibrary = async (req, res) => {
  try {
    const { name, location } = req.body;

    const newLibrary = new Library({ name, location });
    await newLibrary.save();

    res.status(201).json(newLibrary);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET /api/libraries/:id/inventory – Retrieve all books in a specific library
exports.getInventory = async (req, res) => {
  try {
    const library = await Library.findById(req.params.id).populate('books');
    if (!library) {
      return res.status(404).json({ error: 'Library not found' });
    }
    res.json(library.books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addBookToInventory = async (req, res) => {
  try {
    console.log('req.body:', req.body);
    console.log('req.file:', req.file);

    const library = await Library.findById(req.params.id);
    if (!library) {
      return res.status(404).json({ error: 'Library not found' });
    }

    const { title, author } = req.body;
    const Image = req.file ? `/uploads/${req.file.filename}` : '';

    if (!title || !author) {
      return res.status(400).json({ error: 'Title and author are required' });
    }

    const newBook = new Book({
      title,
      author,
      Image,
      library: library._id
    });

    await newBook.save();

    library.books.push(newBook._id);
    await library.save();

    res.status(201).json(newBook);
  } catch (err) {
    console.error('Error:', err);
    res.status(400).json({ error: err.message });
  }
};

// DELETE /api/libraries/:id/inventory/:bookId – Remove a book from library's inventory
exports.removeBookFromInventory = async (req, res) => {
  try {
    const { id: libraryId, bookId } = req.params;

    const library = await Library.findById(libraryId);
    if (!library) {
      return res.status(404).json({ error: 'Library not found' });
    }

    // Remove book from library's books array
    library.books = library.books.filter(book => book.toString() !== bookId);
    await library.save();

    // Optionally delete the book record itself
    await Book.findByIdAndDelete(bookId);

    res.json({ message: 'Book removed from inventory' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
