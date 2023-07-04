const { promisify } = require('util')
const jwt = require("jsonwebtoken");
const User = require("./../models/User");
const bcrypt = require('bcrypt');
const catchAsync = require('../utils/catchAsync')
const AppErr = require("../utils/appErr")

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES
  });
}
const creatSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  res.cookie('jwt', token, {
    expires: new Date(Date.now() + process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 100),
    // secure: true,
    httpOnly: true
  })
  user.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  })
}
exports.signup = catchAsync(async (req, res, next) => {


  // const salt = await bcrypt.genSalt(10);
  // const hashPwd = await bcrypt.hash(req.body.password, salt)

  const newUser = await User.create(req.body)

  creatSendToken(newUser, 201, res)
})

exports.login = catchAsync(async (req, res, next) => {

  const { email, password } = req.body;

  if (!email || !password) {
    next(new AppErr('Please provide email and password'), 400)
  }
  const user = await User.findOne({ email }).select("+password");
  // console.log(await user.correctPassword(password, user.password));

  if (!user || !await user.correctPassword(password, user.password)) {
    return res.status(401).json({
      status: "failed",
      msg: "Incorrect Details"
    })
  }
  creatSendToken(user, 200, res);
  // try {
  //   const user = await User.findOne({ email: req.body.email });
  //   !user && res.status(404).json("user not found")

  //   const validPwd = await bcrypt.compare(req.body.password, user.password);
  //   !validPwd && res.status(400).json("wrong password");

  //   res.status(200).json(user)
  // } catch (err) {
  //   console.log(err);
  // }
})

exports.protect = catchAsync(async (req, res, next) => {
  let token
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1]
  }


  if (!token) {
    return next(new AppErr('You are not logged in! Please log in to get access', 401))
  }
  console.log(process.env.JWT_SECRET);

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

  const currentUser = await User.findById(decoded.id)
  if (!currentUser) {
    return next(new AppErr('The user belonging to the token does no longer exists', 401))
  }

  req.user = currentUser
  next()
})

exports.restrictTo = (...roles) => {
  return (req, res, next) => {

    if (!roles.includes(req.user.role)) {
      return next(new AppErr('You do not have permission to perform this action', 403))
    }
    next()
  }
}
// exports.forgotPassword = catchAsync(async (req, res, next) => {
//   const user = await User.findOne({ email: req.body.email })
//   if (!user) {
//     return next(new AppErr('There is no user with email address.', 404))
//   }
//   const resetToken = user.createPasswordResetToken()
//   await user.save({ validateBeforeSave: false })

// })
// exports.resetPassword = catchAsync(async (req, res, next) => {

// })