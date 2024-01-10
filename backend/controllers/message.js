const Message = require("../models/message");
const mongoose = require("mongoose");

//CREATE MESSAGE
exports.createMessage = (req, res, next) => {
  const message = new Message({
    sender_id: req.body.sender_id,
    receiver_id: req.body.receiver_id,
    content: req.body.content,
  });

  message
    .save()
    .then(() => res.status(201).json({ message: "Message enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};

// GET MESSAGES FROM USER ID AND REFERING ID

exports.getMessagesFromSenderIdAndReceiverId = (req, res, next) => {
  Message.find({
    $or: [
      { sender_id: req.params.user1_id, receiver_id: req.params.user2_id },
      { sender_id: req.params.user2_id, receiver_id: req.params.user1_id },
    ],
  })
    .sort({ timestamp: -1 })
    .then((message) => res.status(200).json(message))
    .catch((error) => res.status(404).json({ error }));
};

// GET MESSAGES FROM USER ID AND REFERING ID FROM => LIMIT

exports.getMessagesFromSenderIdAndReceiverIdFromLimit = (req, res, next) => {
  Message.find({
    $or: [
      { sender_id: req.params.user1_id, receiver_id: req.params.user2_id },
      { sender_id: req.params.user2_id, receiver_id: req.params.user1_id },
    ],
  })
    .sort({ timestamp: -1 })
    .skip(req.params.from)
    .limit(req.params.limit)
    .then((message) => res.status(200).json(message))
    .catch((error) => res.status(404).json({ error }));
};
