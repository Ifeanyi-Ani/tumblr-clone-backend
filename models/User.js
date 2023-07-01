const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
// const validator=require("validator")
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Provide your username"],
    min: 3,
    max: 50,
    unique: [true, "username already exist"]
  },
  email: {
    type: String,
    required: [true, "Provide your email"],
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, "Provide your password"],
    min: 6,
    select: false
  },
  profile_picture: {
    type: String,
    default: '',
  },

  isAdmin: {
    type: Boolean,
    default: false,
  }

},
  { timestamps: true }
);


UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt)
  next();
})

UserSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  try {
    return await bcrypt.compare(candidatePassword, userPassword)
  } catch (error) {
    console.log(error);
  }

}

module.exports = mongoose.model('User', UserSchema)