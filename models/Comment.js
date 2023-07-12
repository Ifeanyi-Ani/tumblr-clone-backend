const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Comment must have a content"],
    },
    postId: {
      type: mongoose.Schema.ObjectId,
      ref: "Post",
      required: [true, "Comment must belong to a post"],
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Comment must show who commented"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

CommentSchema.pre(/^find/, function (next) {
  this.populate({
    path: "userId",
    select: "username photo"
  });
  next();
});

module.exports = mongoose.model("Comment", CommentSchema);
