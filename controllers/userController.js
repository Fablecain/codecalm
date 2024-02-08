const express = require('express');
const session = require('express-session');
const { engine } = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 3000;

const db = require('../models');

app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: 'secret',
    store: new SequelizeStore({
        db: db.sequelize
    }),
    resave: false,
    saveUninitialized: false,
}));

app.use(express.static('public'));

app.get('/', (req, res) => res.render('home'));

const userRoutes = require('userRoutes.js');
const questionRoutes = require('questionRoutes.js');

app.use('/users', userRoutes);
app.use('/questions', questionRoutes);

db.sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
}).catch(err => console.error('Unable to connect to the database:', err));

const User = require('../models').User;

exports.registerForm = (req, res) => {
    res.render('register'); // Render the registration form
};

exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Basic validation
        if (!username || !email || !password) {
            throw new Error('All fields are required');
        }

        // Check for existing user
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            throw new Error('User already exists with this email');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        await User.create({
            username,
            email,
            password: hashedPassword
        });

        // Redirect or send success response
        res.redirect('/login'); // Example redirect to login page
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.loginForm = (req, res) => {
    res.render('login'); // Render the login form
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Basic validation
        if (!email || !password) {
            throw new Error('Email and password are required');
        }

        // Find the user by email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new Error('User not found');
        }

        // Compare password with hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new Error('Incorrect password');
        }

        // Implement session management here if needed

        // Redirect or send success response
        res.redirect('/dashboard'); // Example redirect to dashboard page
    } catch (error) {
        res.status(400).send(error.message);
    }
};
