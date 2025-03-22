const bcrypt = require('bcryptjs');
const User = require('../models/user').User;
const databaseErrorHandler = require('../middleware/databaseErrorHandler');

const initializeData = async (app) => {
  try {
    // Check if there are any users in the database
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      // No users found, create default users
      const defaultUsers = [
        {
          username: 'Danyadmin',
          first_name: 'Dany',
          last_name: 'User',
          email: 'admin@gmail.com',
          password_hash: await bcrypt.hash('adminpassword', 10),
          role: 0, // Assuming 0 is for Admin
        },
        {
          username: 'commonUser',
          first_name: 'Common',
          last_name: 'User',
          email: 'common@gmail.com',
          password_hash: await bcrypt.hash('commonpassword', 10),
          role: 2, // Assuming 2 is for regular User
        },
        // Add more default users as needed
      ];

      await User.insertMany(defaultUsers);
      console.log('Default users created');
    } else {
      console.log('Users already exist in the database');
    }
  } catch (error) {
    console.error('Error initializing data:', error);
    app.use((req, res, next) => databaseErrorHandler(error, req, res, next));
    process.exit(1);
  }
};

module.exports = initializeData;