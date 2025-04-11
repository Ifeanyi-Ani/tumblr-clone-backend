const router = require("express").Router();
const authController = require("./../controllers/authController");
const User = require("../models/User");
//Register

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

// router.post('/forgotPassword', authController.forgotPassword)
// router.post('/resetPassword', authController.resetPassword)

module.exports = router;

