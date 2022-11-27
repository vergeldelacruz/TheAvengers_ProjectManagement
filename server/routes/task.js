const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const auth = require("../middleware/auth");

/**
 * @method - POST
 * @param - /signup
 * @description - Create Task
 */

const Task = require("../model/Task");
router.post(
  "/project/:projectId/task",
  [
    check("name", "Please Enter a valid name").not().isEmpty(),
    check("description", "Please Enter a valid description").not().isEmpty(),
    check("status", "Please Enter a valid status").not().isEmpty(),
    check("startDate", "Please Enter a valid start Date")
      .not()
      .isEmpty(),
    check("endDate", "Please Enter a valid end Date").not().isEmpty(),
    check("assignedTo", "Please Enter an assigned To").not().isEmpty(),
    check("hourlyRate", "Please Enter a hourly rate")
      .isNumeric()
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    let { projectId } = req.params;
    let {
      name,
      description,
      status,
      startDate,
      endDate,
      assignedTo,
      hourlyRate,
      hoursWorked,
      dependentTask
    } = req.body;
    hoursWorked = hoursWorked || 0;
    try {
      let task = await Task.findOne({
        name,
      });
      if (task) {
        return res.status(400).json({
          errors: [{ msg: "Task Already Exists !" }]
        });
      }

      task = new Task({
        projectId,
        name,
        description,
        status,
        startDate,
        endDate,
        assignedTo,
        hourlyRate,
        hoursWorked,
        dependentTask
      });

      await task.save();
      res.status(200).json(task);
    } catch (err) {
      return res.status(500).json({
        errors: [{ msg: "Error in Saving" }]
      });
    }
  }
);

/**
 * @method - GET
 * @description - Get tasks
 * @param - /tasks
 */
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({}).populate('assignedTo').populate('dependentTask');
    res.json(tasks);
  } catch (e) {
    return res.status(500).json({
      errors: [{ msg: "Error in Fetching tasks" }]
    });
  }
});

/**
 * @method - GET
 * @description - Get task
 * @param - /task/id
 */
router.get("/task/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('assignedTo').populate('dependentTask');
    res.json(task);
  } catch (e) {
    return res.status(500).json({
      errors: [{ msg: "Error in Fetching Task" }]
    });
  }
});

/**
 * @method - DELETE
 * @description - Delete task
 * @param - /task/id
 */
router.delete("/task/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Task.findById(id);
    const results = await Task.deleteOne(task);
    res.json(results);
  } catch (e) {
    return res.status(500).json({
      errors: [{ msg: "Error in Deleting Task" }]
    });
  }
});

/**
 * @method - PUT
 * @description - Update task
 * @param - /task/id
 */
router.put("/task/:id", async (req, res) => {
  try {
    const id = req.params.id;
    let {
      name,
      description,
      status,
      startDate,
      endDate,
      assignedTo,
      hourlyRate,
      hoursWorked
    } = req.body;
    hoursWorked = hoursWorked || 0;
    let task = await Task.findByIdAndUpdate(
      id,
      {
        name,
        description,
        status,
        startDate,
        endDate,
        assignedTo,
        hourlyRate,
        hoursWorked
      },
      { new: true }
    );
    res.json(task);
  } catch (e) {
    return res.status(500).json({
      errors: [{ msg: "Error in Updating Task" }]
    });
  }
});

module.exports = router;
