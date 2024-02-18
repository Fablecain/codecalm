const fs = require('fs');
const path = require('path');
const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); // Adjust the path as necessary

const models = {};

fs.readdirSync(__dirname)
  .filter((file) => file !== 'index.js' && file.slice(-3) === '.js')
  .forEach((file) => {
    // Import the model file and initialize it
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    models[model.name] = model;
  });

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = require('sequelize');

module.exports = models;


