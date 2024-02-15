const express = require('express');
const session = require('express-session');
const { engine } = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { v4: uuidv4 } = require('uuid'); // Import UUID
const db = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

// Configure Handlebars
app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Body parser middleware
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
app.get('/', (req, res) => res.render('home'));

app.get('/questions', (req, res) => {
    // Render page for viewing questions
    res.render('questions');
});

app.post('/questions', (req, res) => {
    // Handle submission of new questions
    res.redirect('/questions');
});

app.get('/login', (req, res) => {
    // Render login form
    res.render('login');
});

app.post('/login', (req, res) => {
    // Handle login
    res.redirect('/dashboard');
});

app.get('/dashboard', (req, res) => {
    // Render user dashboard
    res.render('dashboard');
});

// Start the server after syncing the database
db.sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
}).catch(err => console.error('Unable to connect to the database:', err));
