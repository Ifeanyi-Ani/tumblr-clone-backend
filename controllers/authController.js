const jwt = require("jsonwebtoken");
const User = require("./../models/User");
const bcrypt = require('bcrypt');
const catchAsync = require('../utils/catchAsync')

const signToken = (id) => {
  return jwt.sign({ id }, "process.env.JWT_SECRET", {
    expiresIn: "10m"
  });
}
exports.signup = catchAsync(async (req, res, next) => {


  // const salt = await bcrypt.genSalt(10);
  // const hashPwd = await bcrypt.hash(req.body.password, salt)

  const newUser = new User({
    full_name: req.body.full_name,
    email: req.body.email,
    password: req.body.password
    // password: hashPwd
  })

  const token = signToken(newUser._id)

  const user = await newUser.save();
  res.status(201).json({
    status: "success",
    token,
    data: {
      user
    }
  });

})

exports.login = catchAsync(async (req, res, next) => {

  const { full_name, email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      status: "failed",
      msg: "Incorrect login details"
    })
    return
  }
  const user = await User.findOne({ email }).select("+password");
  console.log(await user.correctPassword(password, user.password));

  if (!user || !await user.correctPassword(password, user.password)) {
    return res.status(401).json({
      status: "failed",
      msg: "Incorrect Details"
    })
  }
  const token = signToken(user._id)
  res.status(200).json({
    status: "success",
    token
  })
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

// exports.protect = async (req, res, next) => {
//   let token
//   if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
//     token = req.headers.authorization.split(" ")[1]
//   }
//   console.log(token)

//   if (!token) {
//     res.status(401).json({
//       status: "unauthorized",
//     })
//   }
//   next()
// }

// exports.restrictTo = (admin) => {
//   return (req, res, next) => {
//     // if (!admin)
//     next()
//   }
// }