const catchAsync = require('../utils/catchAsync')
const Post = require('../models/Post');
const AppErr = require('../utils/appErr');
const multer = require("multer")

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img/posts');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `post-${Math.random() * 20000}-${Date.now()}.${ext}`);
  }
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true)
  } else {
    cb(new AppErr("Not an image Please upload only images"), false)
  }
}
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});
exports.uploadPostImage = upload.single('image')

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
  if (req.file) req.body.image = req.file.filename
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
  if (req.file) {
    req.body.image = req.file.filename;
  }
  const newPost = await Post.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      post: newPost
    }
  });
});


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