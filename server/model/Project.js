const mongoose = require("mongoose");
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
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  members: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
});
module.exports = mongoose.model("Project", ProjectSchema);
