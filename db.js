require('dotenv').config(); // Load .env first
const mongoose = require('mongoose');

// Check if MONGO_URL is loaded
console.log("MongoDB URL from .env:", process.env.MONGO_URL);

const mongoURL = process.env.MONGO_URL || "mongodb+srv://rohithkomatireddy051:rohith9110326489@cluster0.acoly.mongodb.net/test1?retryWrites=true&w=majority";

if (!mongoURL) {
    console.error('MongoDB URL not found in environment variables');
    process.exit(1);
}

mongoose.connect(mongoURL, { serverSelectionTimeoutMS: 5000 })
    .then(() => {
        console.log("✅ Connected to MongoDB successfully");
    })
    .catch((err) => {
        console.error("❌ MongoDB connection error:", err);
    });
