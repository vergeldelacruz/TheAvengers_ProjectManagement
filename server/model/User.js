const mongoose = require("mongoose");
const { getRandAvatar } = require("../config/avatars");
const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
    default: getRandAvatar(),
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model("User", UserSchema);
