const express = require('express');
const router = express.Router();

// Example GET route for fetching questions
router.get('/', (req, res) => {
    res.send('Here are the questions.');
});

module.exports = router;
