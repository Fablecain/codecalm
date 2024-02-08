const Comment = require('../models/comment');

exports.displayComments = async (req, res) => {
  const comments = await Comment.findAll();
  res.render('home', { comments });
};

exports.addComment = async (req, res) => {
  await Comment.create({ text: req.body.text });
  res.redirect('/');
};
