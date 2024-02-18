require('dotenv').config(); // Load environment variables

const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const path = require('path');

// Assuming db is set up correctly in ./models/index.js
const db = require('./models');
const sequelize = db.sequelize; // Adjust if your sequelize connection file has a different path

const app = express();
const PORT = process.env.PORT || 3000;

app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());

app.use(session({
    secret: process.env.SESSION_SECRET,
    store: new SequelizeStore({ db: sequelize }),
    resave: false,
    saveUninitialized: true, // or false, based on your needs
    cookie: { secure: 'auto' }, // secure: true in production
}));

// Define routes
// Homepage route
app.get('/', async (req, res) => {
    try {
        const comments = await db.Comment.findAll();
        res.render('home', {
            comments: comments.map(comment => comment.toJSON())
        });
    } catch (error) {
        console.error('Failed to load homepage:', error);
        res.status(500).render('error', { error: 'Error loading the homepage.' });
    }
});

// Additional routes can be defined here

// Start the server
db.sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
}).catch(err => console.error('Unable to connect to the database:', err));
