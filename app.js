const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Setting up Handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Body Parser middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Static folder
app.use(express.static('public'));

// Sessions and Cookies
app.use(cookieParser());
app.use(session({
  secret: 'yourSecret',
  resave: false,
  saveUninitialized: true,
}));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
