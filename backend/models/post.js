const mongoose = require('mongoose');

const postchema = mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    image_url: { type: String, required: true },
    description: { type: String },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [{
        comment_user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        comment_descr : { type: String}
    }],
    timestamp: { type: Date, default: Date.now }
  });



module.exports = mongoose.model('Post', postchema);