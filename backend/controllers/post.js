const Post = require('../models/post');

// CREATE
exports.createPost = (req, res, next) => {

    const post = new Post({
        user_id: req.body.user_id,
        image_url: 'lala',
        description: req.body.description
    });
  
    post.save()
      .then(() => res.status(201).json({ message: 'Post enregistré !'}))
      .catch(error => res.status(400).json({ error }));
}

// UPDTAE 
exports.updatePost = (req, res, next) => {
  Post.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Post modifié !'}))
    .catch(error => res.status(400).json({ error }));
}

// DELETE
exports.deletePost = (req, res, next) => {
    Post.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Post supprimé !'}))
    .catch(error => res.status(400).json({ error }));
}

// GET BY ID
exports.getByIdPost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
    .then(post => res.status(200).json(post))
    .catch(error => res.status(404).json({ error }));
}

// GET FROM USER ID
exports.getFromUserIdPost = (req, res, next) => {
    Post.find({ user_id: req.params.user_id })
    .then(post => res.status(200).json(post))
    .catch(error => res.status(404).json({ error }));
}

// GET ALL
exports.getAllPost = (req, res, next) => {
    Post.find()
    .then(post => res.status(200).json(post))
    .catch(error => res.status(400).json({ error }));
}