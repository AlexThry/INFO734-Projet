const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


// CREATE
exports.createUser = (req, res, next) => {

  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });

  user.save()
    .then(() => res.status(201).json({ message: 'User enregistré !'}))
    .catch(error => res.status(400).json({ error }));
}

// UPDTAE 
exports.updateUser = (req, res, next) => {
//   User.updateOne({ _id: req.params.id }, { $addToSet: {followers: req.body.newFollowerId}, _id: req.params.id })
//     .then(() => res.status(200).json({ message: 'User modifié !'}))
//     .catch(error => res.status(400).json({ error }));
}

// NEW FOLLOWING
exports.newFollowingUser = (req, res, next) => {
    const userCurrentId = req.body.userCurrentId;
    const userToFollowId = req.body.userToFollowId;

    // Update userCurrentId : Add userToFollowId in list of following
    User.updateOne({ _id: userCurrentId }, { $addToSet: {following: userToFollowId}, _id: userCurrentId })
        .then(() => {
            res.status(200).json({ message: 'UserToFollow a bien été ajouté à la liste de following !'});
        })
        .catch(error => res.status(400).json({ error }));
}

// NEW FOLLOWER
exports.newFollowerUser = (req, res, next) => {
    const userCurrentId = req.body.userCurrentId;
    const userToFollowId = req.body.userToFollowId;

    // Update userToFollowId : Add userCurrentId in list of followers
    User.updateOne({ _id: userToFollowId }, { $addToSet: {followers: userCurrentId}, _id: userToFollowId })
    .then(() => res.status(200).json({ message: 'userCurrentId a bien été ajouté à la liste de followers !'}))
    .catch(error => res.status(400).json({ error }));
}

// DELETE
exports.deleteUser = (req, res, next) => {
    User.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'User supprimé !'}))
    .catch(error => res.status(400).json({ error }));
}

// GET BY ID
exports.getByIdUser = (req, res, next) => {
    User.findOne({ _id: req.params.id })
    .then(user => res.status(200).json(user))
    .catch(error => res.status(404).json({ error }));
}

// GET ALL
exports.getAllUser = (req, res, next) => {
    User.find()
    .then(users => res.status(200).json(users))
    .catch(error => res.status(400).json({ error }));
}


// ---- CONNEXION
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {

    User.findOne({email: req.body.email})
        .then(user => {
            if(!user) {
                return res.status(401).json({message: "User doesn't exist"});
            }
            

            bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({message: "Password incorrect"});
                }

                res.status(200).json({
                    userId: user._id, 
                    token: jwt.sign(
                        {userId: user._id},
                        'RANDOM_TOKEN_SECRET',
                        {expiresIn: '24h'}
                    )
                });
            })
            .catch(error => res.status(500).json({ prout: "prout" }));
        })
        .catch(error => res.status(500).json({ err: "lala" }));

};



// // UPDATE
// app.put('/api/stuff/:id', (req, res, next) => {
//   Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
//     .then(() => res.status(200).json({ message: 'Objet modifié !'}))
//     .catch(error => res.status(400).json({ error }));
// });

// // DELETE
// app.delete('/api/stuff/:id', (req, res, next) => {
//   Thing.deleteOne({ _id: req.params.id })
//     .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
//     .catch(error => res.status(400).json({ error }));
// });