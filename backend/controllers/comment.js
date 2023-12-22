const Comment = require("../models/comment")
const mongoose = require("mongoose");

exports.createComment = (req, res, next) => {

    const comment = new Comment({
        content: req.body.content,
        post_id: req.body.post_id,
    });

    comment.save()
        .then(() => res.status(201).json({ message: 'Commentaire enregistré !'}))
        .catch(error => res.status(400).json({ error }));
}



// DELETE COMMENT BY ID
exports.deleteCommentById = (req, res, next) => {
    Comment.deleteOne({_id: req.params.id})
        .then(() => res.status(200).json({message: "Commentaire supprimé"}))
        .catch(error => res.status(400).json({ error }));
}

// GET COMMENT BY ID
exports.getCommentById = (req, res, next) => {
    Comment.findOne({_id: req.params.id})
        .then(comment => res.status(200).json(comment))
        .catch(error => res.status(404).json({ error }));
}

// GET COMMENT BY POST ID
exports.getCommentsByPostId = (req, res, next) => {
    Comment.find({post_id: req.params.post_id})
        .then(comment => res.status(200).json(comment))
        .catch(error => res.status(404).json({ error }));
}
