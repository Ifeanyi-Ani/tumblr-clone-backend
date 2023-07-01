const express = require("express")
const router = express.Router();
const { json } = require('express');
const userController = require("../controllers/userController");
const authController = require("../controllers/authController")



//update User
router
  .route("/:id")
  .put(userController.updateUser)
  .delete(userController.deleteUser)
  .get(userController.getUser)
//get all user
router.get("/", userController.getAllUser)
//follow a user
router.put("/:id/followers", userController.followers)
//unfollow a user
module.exports = router;