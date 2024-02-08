const express = require('express');
const session = require('express-session');
const { engine } = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid'); // Import UUID

const app = express();
const PORT = process.env.PORT || 3000;

const db = require('./models');

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

// Route to render the home page
app.get('/', (req, res) => res.render('home'));

// Route to render the registration form
app.get('/users/register', (req, res) => {
    res.render('register');
});

// Route to handle user registration
app.post('/users/register', async (req, res) => {
    const { password } = req.body;

    try {
        // Generate UUID for anonymous user
        const userId = uuidv4();

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user data to database
        await db.User.create({
            id: userId,
            password: hashedPassword
        });

        res.redirect('/login');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Route to render the login form
app.get('/users/login', (req, res) => {
    res.render('login');
});

// Route to handle user login
app.post('/users/login', async (req, res) => {
    const { password } = req.body;

    try {
        // Authenticate user (dummy authentication for anonymous users)
        const user = await db.User.findOne();
        if (!user) {
            throw new Error('User not found');
        }

        // Compare passwords (dummy comparison for anonymous users)
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new Error('Incorrect password');
        }

        res.redirect('/dashboard');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Route to get all questions
app.get('/questions', async (req, res) => {
    try {
        const questions = await db.Question.findAll();
        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to create a new question
app.post('/questions', async (req, res) => {
    const { title, content } = req.body;

    try {
        if (!title || !content) {
            throw new Error('Title and content are required');
        }

        const newQuestion = await db.Question.create({
            title,
            content
        });

        res.json(newQuestion);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Start the server
db.sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
}).catch(err => console.error('Unable to connect to the database:', err));
