const express = require("express");
const commentController = require("../controllers/commentController");
const { protect } = require("../controllers/authController");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(protect, commentController.createComment)
  .get(commentController.getComments);

router
  .route("/:commentId")
  .patch(protect, commentController.editComment)
  .delete(protect, commentController.deleteComment);

// router.get("/comments", commentController.getAllComments)

module.exports = router;
