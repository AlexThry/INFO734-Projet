const express = require('express');
const commentCtrl = require("../controllers/comment");

const router = express.Router();

router.post('/create', commentCtrl.createComment);
router.delete('/delete/:id', commentCtrl.deleteCommentById);

router.get('/:id', commentCtrl.getCommentById);
router.get('/postId/:post_id', commentCtrl.getCommentsByPostId)

module.exports = router;