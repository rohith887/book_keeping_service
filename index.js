const express = require('express');
const dotenv = require('dotenv');
const i18n = require('./middleware/i18n');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Load environment variables
require('dotenv').config();


// DB Connection
require('./db'); // This will run the connection logic from db.js

// Route Imports
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const borrowRoutes = require('./routes/borrowRoutes');
const libraryRoutes = require('./routes/libraryRoutes'); // Uncomment when created
// const libraryRoutes = require('./routes/libraryRoutes'); // Uncomment when created

// Initialize app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Internationalization (EN/HI)
app.use(i18n.init);

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/borrow', borrowRoutes); 
app.use('/api/libraries', libraryRoutes); // Uncomment when created
// app.use('/api/libraries', libraryRoutes);

// Root route
app.get('/', (req, res) => {
  res.send({ message: req.__('messages.welcome') || 'Welcome to the Bookkeeping API' });
});

// Server Start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
