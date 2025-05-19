const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  library: { type: mongoose.Schema.Types.ObjectId, ref: 'Library', required: true },
  borrower: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  imageUrl: { type: String },
});

module.exports = mongoose.model('Book', bookSchema);
