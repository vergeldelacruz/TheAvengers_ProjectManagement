const mongoose = require("mongoose");
const TaskSchema = mongoose.Schema({
  projectId: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
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
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  completionDate: {
    type: Date,
  },
  assignedTo: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'User'
  },
  hourlyRate: {
    type: Number,
    required: true,
  },
  hoursWorked: {
    type: Number,
    required: true,
  },
  dependentTask: {
    type: mongoose.Schema.ObjectId,
    ref: 'Task'
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model("Task", TaskSchema);
