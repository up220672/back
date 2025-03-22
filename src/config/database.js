const mongoose = require('mongoose');
const databaseErrorHandler = require('../middleware/databaseErrorHandler');
require('dotenv').config();

const connectDB = async (app) => {
  const dbConnection = process.env.MONGODB_URI || 'mongodb://localhost:27017/Quick-Trips-api';
  try {
    await mongoose.connect(dbConnection, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    app.use((req, res, next) => databaseErrorHandler(error, req, res, next));
    process.exit(1);
  }
};

module.exports = connectDB;