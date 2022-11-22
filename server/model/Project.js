const mongoose = require("mongoose");
const { getRandColor } = require("../config/avatars");
const ProjectSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  hours: {
    type: Number,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: false,
    default: getRandColor(),
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  members: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
});
module.exports = mongoose.model("Project", ProjectSchema);
