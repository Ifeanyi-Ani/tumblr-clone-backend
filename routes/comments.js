

const express = require("express");
const commentController = require("../controllers/commentController");

const router = express.Router();

router
  .route("/posts/:postId/comments")
  .post(commentController.createComment)
  .get(commentController.getComments);

router
  .route("/posts/:postId/comments/:commentId")
  .patch(commentController.editComment)
  .delete(commentController.deleteComment);

router.get("/posts/comments", commentController.getAllComments)

module.exports = router;
