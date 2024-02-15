// routes/commentRoutes.js

const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// Route for displaying all comments
router.get('/', commentController.getAllComments);

// Route for displaying the form for adding a new comment
router.get('/add', commentController.showAddCommentForm);

// Route for submitting a new comment
router.post('/add', commentController.addComment);

// Route for displaying the form for editing a comment
router.get('/:id/edit', commentController.showEditCommentForm);

// Route for updating a comment
router.post('/:id/edit', commentController.updateComment);

// Route for deleting a comment
router.post('/:id/delete', commentController.deleteComment);

module.exports = router;
