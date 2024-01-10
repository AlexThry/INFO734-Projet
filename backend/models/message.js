const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  sender_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiver_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  conversation_id: { type: String },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

messageSchema.pre("save", function (next) {
  if (parseInt(this.sender_id) > parseInt(this.receiver_id)) {
    this.conversation_id =
      this.sender_id.toString() + this.receiver_id.toString();
  } else {
    this.conversation_id =
      this.receiver_id.toString() + this.sender_id.toString();
  }
  next();
});

module.exports = mongoose.model("Message", messageSchema);
