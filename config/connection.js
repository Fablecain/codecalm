const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('codecalm', 'cain', 'C41nF0x6283*', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
