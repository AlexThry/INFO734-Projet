const express = require("express");
const commentCtrl = require("../controllers/comment");

const router = express.Router();

router.get("/", commentCtrl.getAllComments);

router.post("/create", commentCtrl.createComment);
router.delete("/delete/:id", commentCtrl.deleteCommentById);

router.get("/:id", commentCtrl.getCommentById);
router.get("/postId/:post_id", commentCtrl.getCommentsByPostId);
router.get("/postId/:post_id/:limit", commentCtrl.getCommentsByPostIdLimit);

module.exports = router;
