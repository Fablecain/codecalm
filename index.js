const express = require('express');
const session = require('express-session');
const { engine } = require('express-handlebars'); // Corrected import
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3000;

// Importing the db object from your Sequelize setup, which includes sequelize instance and models
const db = require('./models');

// Correctly setup Handlebars as the view engine
app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Express body parser middleware to parse request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Setup session middleware with Sequelize store
app.use(session({
    secret: 'secret', // Use a secure, unique secret in production
    store: new SequelizeStore({
        db: db.sequelize
    }),
    resave: false,
    saveUninitialized: false,
}));

// Static folder (for CSS, JavaScript, and images)
app.use(express.static('public'));

// Routes
// Example route for home page
app.get('/', (req, res) => res.render('home'));

// Import user and question routes
const userRoutes = require('./routes/userRoutes');
const questionRoutes = require('./routes/questionRoutes');

// Use routes
app.use('/users', userRoutes);
app.use('/questions', questionRoutes);

// Start the server after syncing the database
db.sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
}).catch(err => console.error('Unable to connect to the database:', err));
