const express = require('express');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3000;

// Set up Handlebars middleware
const hbs = exphbs.create({ defaultLayout: 'main' });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Other middleware setup (if any)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes and route handlers
app.get('/register', (req, res) => {
    res.render('register');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
