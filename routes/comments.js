const express = require('express');
const router = express.Router();
const db = require('../models'); // Adjust the path as necessary

// POST route for creating a new comment
router.post('/add', async (req, res) => {
    try {
        const { text } = req.body;
        await db.Comment.create({ text });
        res.redirect('/'); // Redirect back to the homepage after adding the comment
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).send('Error creating comment');
    }
});

module.exports = router;

