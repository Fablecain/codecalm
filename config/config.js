require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_DEVELOPMENT,
    host: "127.0.0.1",
    dialect: "mysql", // Or 'postgres', 'sqlite', 'mariadb', 'mssql' depending on your DB
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_TEST,
    host: "127.0.0.1",
    dialect: "mysql", // Or another dialect as per your setup
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // This is important to avoid SSL errors
      }
    }
  }
};
