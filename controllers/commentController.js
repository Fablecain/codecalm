// controllers/commentController.js

const Comment = require('../models/comment');

// Controller methods for handling CRUD operations on comments
const commentController = {
    // Method to display all comments
    getAllComments: async (req, res) => {
        try {
            const comments = await Comment.findAll();
            res.render('comments', { comments });
        } catch (error) {
            console.error('Error fetching comments:', error);
            res.status(500).send('Error fetching comments');
        }
    },

    // Method to display a form for adding a new comment
    showAddCommentForm: (req, res) => {
        res.render('addCommentForm');
    },

    // Method to submit a new comment
    addComment: async (req, res) => {
        try {
            const { text } = req.body;
            await Comment.create({ text });
            res.redirect('/comments');
        } catch (error) {
            console.error('Error adding comment:', error);
            res.status(500).send('Error adding comment');
        }
    },

    // Method to display a form for editing a comment
    showEditCommentForm: async (req, res) => {
        const { id } = req.params;
        try {
            const comment = await Comment.findByPk(id);
            res.render('editCommentForm', { comment });
        } catch (error) {
            console.error('Error fetching comment:', error);
            res.status(500).send('Error fetching comment');
        }
    },

    // Method to update a comment
    updateComment: async (req, res) => {
        const { id } = req.params;
        const { text } = req.body;
        try {
            await Comment.update({ text }, { where: { id } });
            res.redirect('/comments');
        } catch (error) {
            console.error('Error updating comment:', error);
            res.status(500).send('Error updating comment');
        }
    },

    // Method to delete a comment
    deleteComment: async (req, res) => {
        const { id } = req.params;
        try {
            await Comment.destroy({ where: { id } });
            res.redirect('/comments');
        } catch (error) {
            console.error('Error deleting comment:', error);
            res.status(500).send('Error deleting comment');
        }
    }
};

module.exports = commentController;
