const User = require("../models/User")
const bcrypt = require("bcrypt");
const catchAsync = require('../utils/catchAsync');
const AppErr = require("../utils/appErr");

exports.updateUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const ID = id * 1;
  if (ID === req.body.userID || req.body.isAdmin) {
    if (req.body.password) {

      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt)



    }

    const user = await User.findByIdAndUpdate(id, {
      $set: req.body,
    });

    res.status(200).json("Account has been updated")


  } else {
    return res.status(403).json("You can update only your account")
  }
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params
  console.log(id);
  if (id === req.body.userID || req.body.isAdmin) {

    const user = await User.findByIdAndDelete(id)

    res.status(200).json("Account has been deleted successfully")


  } else {
    return res.status(403).json("You can delete only your account")
  }
})

exports.getUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    return next(new AppErr('No user found with that ID', 404))
  }

  const { password, updatedAt, createdAt, ...other } = user._doc;
  res.status(200).json(other);




})

exports.getAllUser = catchAsync(async (req, res, next) => {
  console.log(User);
  const user = await User.find()
  res.status(200).json({
    status: "success",
    results: user.length,
    data: {
      user
    }
  })
})

exports.followers = catchAsync(async (req, res) => {
  const { id } = req.params;
  if (req.body.userID !== id) {

    const user = await User.findById(id);
    const currentUser = await User.findById(req.body.userID)
    if (!user.upvotes.includes(req.body.userID)) {
      await user.updateOne({ $push: { upvotes: req.body.userID } })
    } else {
      res.status(403).json("you already follow this user")
    }


  } else {
    res.status(403).json("you can't follow yourself")
  }
})