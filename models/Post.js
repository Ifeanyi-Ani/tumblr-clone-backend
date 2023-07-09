const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title most have a title"]
  },
  body: {
    type: String,
  },
  image: {
    type: String,
    default: ""
  },
  category: [],
  comments: {
    type: Array,
    default: []
  },
  likes: [],
  createdAt: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Post must belong to a user"]
  }
},
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  })
PostSchema.pre(/^find/, function (next) {
  this.populate({
    path: "userId"
  })
  next()
})
module.exports = mongoose.model("Post", PostSchema)