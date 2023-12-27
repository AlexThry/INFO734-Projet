const Post = require('../models/post');
const User = require("../models/user");

// CREATE
exports.createPost = (req, res, next) => {

    const post = new Post({
        user_id: req.body.user_id,
        image_url: `${req.protocol}://${req.get('host')}/images/posts/${req.file.filename}`,
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

// ADD LIKE 
exports.likePost = (req, res, next) => {
    Post.updateOne({ _id: req.params.id }, { $addToSet: {likes: req.body.userId}, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Le user a bien été ajouté à la liste de likes du post'}))
      .catch(error => res.status(400).json({ error }));
}

// REMOVE LIKE 
exports.unlikePost = (req, res, next) => {
    Post.updateOne({ _id: req.params.id }, { $pull: {likes: req.body.userId}, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Le user a bien été retiré de la liste de likes du post'}))
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
    .sort({ timestamp: -1 })
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(400).json({ error }));
};

exports.getPostsBySearchTerm = (req, res, next) =>{
    Post.find({description: { $regex: new RegExp(req.body.term) }})
        .then(post => res.status(200).json(post))
        .catch(error => res.status(400).json({ error }));
}

// GET POSTS BY USER ID FROM => TO
exports.getPostsByUserIdFromLimit = (req, res, next) => {
  Post.find({ user_id: req.params.user_id })
    .sort({ timestamp: -1 })
    .skip(req.params.start)
    .limit(req.params.end)
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(400).json({ error }));
};

// GET POSTS FROM => LIMIT
exports.getPostsFromLimit = (req, res, next) => {
  Post.find()
    .sort({ timestamp: -1 })
    .skip(req.params.start)
    .limit(req.params.end)
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(400).json(error));
};

