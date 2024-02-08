require('dotenv').config(); // Load environment variables from .env file at the very start

const express = require('express');
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const commentRoutes = require('./routes/commentRoutes');
const sequelize = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

// Setup Handlebars as the view engine
app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Middleware for parsing request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files
app.use(express.static('public'));

// Session middleware setup with secret pulled from environment variables
app.use(session({
  secret: process.env.SESSION_SECRET, // Use the SESSION_SECRET variable from .env file
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
}));

// Routes
app.use('/', commentRoutes);

// Sync Sequelize models to the database, then start the server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => console.log('Error starting the server:', err));
