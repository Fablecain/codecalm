const { Sequelize } = require('sequelize');
const config = require('./config.js');

let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  });
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect
  });
}

module.exports = sequelize;
