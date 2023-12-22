const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    post_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    content: { type: String, required: true },
});



module.exports = mongoose.model('Comment', commentSchema);