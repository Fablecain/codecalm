'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  async up (queryInterface, Sequelize) {
    const salt = await bcrypt.genSalt(10); // Generate salt with 10 rounds
    // Define users with plain text passwords to be hashed
    const users = [
      {
        username: 'AnonymousCoder1',
        email: 'anonymous1@example.com',
        password: 'securePassword1', // Replace with your plain text passwords
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'AnonymousCoder2',
        email: 'anonymous2@example.com',
        password: 'securePassword2', // Replace with your plain text passwords
        createdAt: new Date(),
        updatedAt: new Date()
      }
      // Add more users as needed
    ];

    // Hash passwords
    for (let user of users) {
      user.password = await bcrypt.hash(user.password, salt);
    }

    // Insert users into the database with hashed passwords
    await queryInterface.bulkInsert('Users', users, {});
  },

  async down (queryInterface, Sequelize) {
    // If needed, define logic here to revert the seeding, such as deleting the inserted users
    await queryInterface.bulkDelete('Users', null, {});
  }
};

