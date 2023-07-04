const User = require("../models/User")
const bcrypt = require("bcrypt");
const catchAsync = require('../utils/catchAsync');
const AppErr = require("../utils/appErr");

exports.updateUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(id, (id * 1));
  const user = await User.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true
  })
  if (!user) {
    return next(new AppErr('No user found with that ID', 404))
  }
  res.status(200).json({
    status: 'success',
    data: {
      data: user
    }
  })
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params
  const user = await User.findByIdAndDelete(id)
  if (!user) {
    return next(new AppErr('No user found with that ID', 404))
  }
  res.status(200).json({
    status: 'success',
    data: null
  })
})

exports.getUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id).populate("posts");

  if (!user) {
    return next(new AppErr('No user found with that ID', 404))
  }

  // const { password, updatedAt, createdAt, ...other } = user._doc;
  res.status(200).json(user);




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


// const filterObj = (obj, ...allowedFields) => {
//   const newObj = {}
//   Object.keys(obj).forEach(el => {
//     if (allowedFields.includes(el)) newObj[el] = obj[el]
//   })
// }
// exports.updateMe = catchAsync(async (req, res, next) => {
//   if (req.body.password || req.body.passwordConfirm) {
//     return next(new AppErr('This route is not for password update. Please use /forgotPassword.', 400))
//   }
//   const filteredBody = filterObj(req.body, 'username', 'category', 'photo')
//   const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
//     new: true,
//     runValidators: true
//   })
//   res.status(200).json({
//     status: "success",
//     data: {
//       user: updatedUser
//     }
//   })
// })