const express = require('express');
const commentsController = require('../controllers/commentsController');

const router = express.Router();

router.get('/', commentsController.displayComments);
router.post('/add', commentsController.addComment);

module.exports = router;
