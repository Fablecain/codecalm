'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Questions', [
      {
        title: 'How to maintain work-life balance as a developer?',
        content: 'I find myself constantly thinking about coding, even in my free time. How do you guys manage to maintain a healthy work-life balance?',
        userId: 1, // Assuming '1' is an ID from your seeded Users. Adjust as necessary.
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Dealing with burnout',
        content: 'I’ve been feeling overwhelmed with projects and deadlines. How do you deal with burnout and regain your motivation?',
        userId: 2, // Adjust based on your Users seeder or existing data.
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Add more questions as needed
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Questions', null, {});
  }
};

