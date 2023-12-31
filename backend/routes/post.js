const express = require("express");
// const auth = require('../middleware/auth');
const postCtrl = require('../controllers/post');
const multer = require('../middleware/multer-config-post');

const userCtrl = require("../controllers/user");

const router = express.Router();

router.post('/searchByTerm', postCtrl.getPostsBySearchTerm)
router.post('/create', multer, postCtrl.createPost);

router.put("/update/:id", postCtrl.updatePost);
router.put("/addLike/:id", postCtrl.likePost);
router.put("/removeLike/:id", postCtrl.unlikePost);

router.delete("/delete/:id", postCtrl.deletePost);

router.get("/:id", postCtrl.getByIdPost);
router.get("/user/:user_id", postCtrl.getFromUserIdPost);
router.get("/", postCtrl.getAllPost);
router.get(
  "/user/:user_id/limit/start=:start&end=:end",
  postCtrl.getPostsByUserIdFromLimit,
);
router.get("/limit/start=:start&end=:end", postCtrl.getPostsFromLimit);

module.exports = router;
