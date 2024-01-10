const express = require("express");
const messageCtrl = require("../controllers/message");

const router = express.Router();

router.post("/create", messageCtrl.createMessage);

router.get(
  "/user1=:user1_id&user2=:user2_id",
  messageCtrl.getMessagesFromSenderIdAndReceiverId,
);
router.get(
  "/user1=:user1_id&user2=:user2_id/from=:from&limit=:limit",
  messageCtrl.getMessagesFromSenderIdAndReceiverIdFromLimit,
);
router.post("/user-messages", messageCtrl.getLatestMessagePerConversation);

module.exports = router;
