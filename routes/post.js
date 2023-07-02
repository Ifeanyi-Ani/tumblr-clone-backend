const express = require("express");
const router = express.Router();
const postController = require('../controllers/postController')

router
  .route('/:id')
  .patch(postController.updatePost)
  .get(postController.getPost)


router
  .route('/')
  .get(postController.getAllPost)
  .post(postController.createPost)

module.exports = router