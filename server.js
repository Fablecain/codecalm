require('dotenv').config(); // Load environment variables

const express = require('express');
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const path = require('path');
const { Sequelize } = require('sequelize');
const db = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());

// Database connection setup
const sequelize = new Sequelize(process.env.JAWSDB_URL);

// Import routes for comments
const commentRoutes = require('./routes/comments');
app.use('/comments', commentRoutes);

// Homepage route that fetches and displays comments
app.get('/', async (req, res) => {
    try {
        const comments = await db.Comment.findAll();
        res.render('home', { comments: comments.map(comment => comment.toJSON()) });
    } catch (error) {
        console.error('Failed to load homepage:', error);
        res.status(500).send('Error loading the homepage');
    }
});

// Start the server
sequelize.authenticate().then(() => {
    console.log('Database connection has been established successfully.');
    app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});

