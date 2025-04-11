const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const commentRouter = require("../routes/comments");
const { protect } = require("../controllers/authController");

router.use("/:postId/comments", commentRouter);

router
  .route("/:id")
  .patch(protect, postController.uploadPostImage, postController.updatePost)
  .delete(protect, postController.deletePost)
  .get(postController.getPost);

router
  .route("/")
  .get(postController.getAllPost)
  .post(protect, postController.uploadPostImage, postController.createPost);

module.exports = router;
