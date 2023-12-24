const Comment = require("../models/comment");
const mongoose = require("mongoose");

// CREATE COMMENT
exports.createComment = (req, res, next) => {
  const comment = new Comment({
    post_id: req.body.post_id,
    user_id: req.body.user_id,
    content: req.body.content,
  });

  comment
    .save()
    .then(() => res.status(201).json({ message: "Commentaire enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};

// DELETE COMMENT BY ID
exports.deleteCommentById = (req, res, next) => {
  Comment.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Commentaire supprimé" }))
    .catch((error) => res.status(400).json({ error }));
};

// GET ALL COMMENT
exports.getAllComments = (req, res, next) => {
  Comment.find({})
    .then((comment) => res.status(200).json(comment))
    .catch((error) => res.status(404).json({ error }));
};

// GET COMMENT BY ID
exports.getCommentById = (req, res, next) => {
  Comment.findOne({ _id: req.params.id })
    .then((comment) => res.status(200).json(comment))
    .catch((error) => res.status(404).json({ error }));
};

// GET COMMENT BY POST ID
exports.getCommentsByPostId = (req, res, next) => {
  Comment.find({ post_id: req.params.post_id })
    .then((comment) => res.status(200).json(comment))
    .catch((error) => res.status(404).json({ error }));
};

// GET COMMENT BY POST ID FROM A TO B
exports.getCommentsByPostIdLimit = (req, res, next) => {
  const n = parseInt(req.params.limit) || 10;

  Comment.find({ post_id: req.params.post_id })
    .sort({ timestamp: -1 })
    .limit(n)
    .then((comment) => res.status(200).json(comment))
    .catch((error) => res.status(404).json({ error }));
};
