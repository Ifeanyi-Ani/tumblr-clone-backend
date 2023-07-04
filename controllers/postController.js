const catchAsync = require('../utils/catchAsync')
const Post = require('../models/Post');
const AppErr = require('../utils/appErr');

exports.getPost = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const post = await Post.findById(id);

  if (!Post) {
    return next(new AppErr('No Post found with that ID', 404))
  }

  // const post = user._doc;
  res.status(200).json({
    status: "success",
    data: {
      post
    }
  });

})

exports.updatePost = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const post = await Post.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true
  })
  if (!post) {
    return next(new AppErr('No post found with that ID', 404))
  }
  res.status(200).json({
    status: 'success',
    data: {
      data: post
    }
  })
})

exports.deletePost = catchAsync(async (req, res, next) => {
  const post = await Post.findByIdAndDelete(req.params.id);
  if (!post) {
    return next(new AppErr('No post found with that ID', 404))
  }
  res.status(200).json({
    status: 'success',
    data: null
  })
})

exports.createPost = catchAsync(async (req, res, next) => {
  const newPost = await Post.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      posts: newPost
    }
  })
})

exports.getAllPost = catchAsync(async (req, res, next) => {

  const posts = await Post.find()
  res.status(200).json({
    status: "success",
    results: posts.length,
    data: {
      posts
    }
  })
})