const Comment = require("../models/Comment");
const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");
const AppErr = require("../utils/appErr");

exports.createComment = catchAsync(async (req, res, next) => {
  const { postId } = req.params;
  // const { text, userId } = req.body;

  if (postId) {
    req.body.postId = postId;
  }
  req.body.userId = req.user.id;

  // // Check if the user exists
  // const user = await User.findById(userId);
  // if (!user) {
  //   return next(new AppErr("No user found with that ID", 404));
  // }

  const comment = await Comment.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      comment,
    },
  });
});

exports.getComments = catchAsync(async (req, res, next) => {
  let filter = {};
  const { postId } = req.params;
  console.log({ postId });
  if (postId) {
    filter = { postId };
  }
  const comments = await Comment.find(filter);

  res.status(200).json({
    status: "success",
    results: comments.length,
    data: {
      comments,
    },
  });
});
exports.getAllComments = catchAsync(async (req, res, next) => {
  const comments = await Comment.find();
  res.status(200).json({
    status: "success",
    results: comments.length,
    data: {
      comments,
    },
  });
});
exports.editComment = catchAsync(async (req, res, next) => {
  const { commentId } = req.params;
  const { text } = req.body;

  if (!text) {
    return next(new AppErr("Comment text is required.", 400));
  }

  const comment = await Comment.findByIdAndUpdate(
    commentId,
    { text },
    { new: true, runValidators: true },
  );

  if (!comment) {
    return next(new AppErr("No comment found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      comment,
    },
  });
});

exports.deleteComment = catchAsync(async (req, res, next) => {
  const { commentId } = req.params;

  const comment = await Comment.findByIdAndDelete(commentId);

  if (!comment) {
    return next(new AppErr("No comment found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: null,
  });
});
