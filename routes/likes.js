const express = require('express')
const router = express.Router()
const likeController = require('../controllers/likeController')

router.post("/:postId/like", likeController.likePost);
router.post("/:postId/unlike", likeController.unlikePost)

module.exports = router;