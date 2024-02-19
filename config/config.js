require('dotenv').config(); // Make sure to require dotenv at the top if you're using environment variables stored in a .env file locally

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_DEVELOPMENT,
    host: "127.0.0.1",
    dialect: "mysql",
    // Add any other development-specific settings here
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_TEST,
    host: "127.0.0.1",
    dialect: "mysql",
    // Add any other test-specific settings here
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // This helps to avoid SSL errors in certain cases
      }
    }
    // You can add any other production-specific settings here
  }
};
