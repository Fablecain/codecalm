const express = require('express');
const session = require('express-session');
const { engine } = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const bcrypt = require('bcrypt');
const db = require('../models'); // Ensure this path matches the location of your models

const app = express();
const PORT = process.env.PORT || 3000;

// Set up Handlebars
app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Middleware for parsing request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Setting up session middleware
app.use(session({
    secret: process.env.SESSION_SECRET, // Use the secret from your environment variables
    store: new SequelizeStore({
        db: db.sequelize
    }),
    resave: false,
    saveUninitialized: true, // Changed to true to initialize session
    cookie: { secure: false } // For development, set secure to true in production
}));

// Serve static files
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => res.render('home'));

// Import routes
const userRoutes = require('./routes/userRoutes'); // Adjust the path as necessary
const questionRoutes = require('./routes/questionRoutes'); // Adjust the path as necessary

// Use routes
app.use('/users', userRoutes);
app.use('/questions', questionRoutes);

// Sync database and start server
db.sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
}).catch(err => console.error('Unable to connect to the database:', err));

// User model
const User = db.User; // Adjust according to your models' structure

// Register form
exports.registerForm = (req, res) => {
    res.render('register'); // Render the registration form
};

// Register user
exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        if (!username || !email || !password) {
            throw new Error('All fields are required');
        }
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            throw new Error('User already exists with this email');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            username,
            email,
            password: hashedPassword
        });
        res.redirect('/login'); // Redirect to login page after registration
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// Login form
exports.loginForm = (req, res) => {
    res.render('login'); // Render the login form
};

// User login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            throw new Error('Email and password are required');
        }
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new Error('User not found');
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new Error('Incorrect password');
        }
        // Set user ID in session
        req.session.userID = user.id; // Save user ID to session
        res.redirect('/dashboard'); // Redirect to dashboard after successful login
    } catch (error) {
        res.status(400).send(error.message);
    }
};
