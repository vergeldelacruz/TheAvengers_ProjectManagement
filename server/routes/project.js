const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const auth = require("../middleware/auth");

/**
 * @method - POST
 * @param - /signup
 * @description - Create Project
 */

const Project = require("../model/Project");
router.post(
  "/project",
  [
    check("name", "Please Enter a valid name").not().isEmpty(),
    check("description", "Please Enter a valid description").not().isEmpty(),
    check("status", "Please Enter a valid status").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: false,
        errors: errors.array(),
      });
    }

    let { name, description, status, hours, cost, members } = req.body;
    hours = hours || 0;
    cost = cost || 0;
    members = members || [];
    try {
      let project = await Project.findOne({
        name,
      });
      if (project) {
        return res.status(400).json({
          errors: [{ msg: "Project Already Exists" }],
        });
      }

      project = new Project({
        name,
        description,
        status,
        hours,
        cost,
        members,
      });

      await project.save();
      res.status(200).json(project);
    } catch (err) {
      return res.status(500).json({
        errors: [{ msg: "Error in Saving" }],
      });
    }
  }
);

/**
 * @method - GET
 * @description - Get projects
 * @param - /projects
 */
router.get("/projects", async (req, res) => {
  try {
    const projects = await Project.find({});
    res.json(projects);
  } catch (e) {
    return res.status(400).json({
      errors: [{ msg: "Error in Fetching projects" }],
    });
  }
});

/**
 * @method - GET
 * @description - Get project
 * @param - /project/id
 */
router.get("/project/:id", auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    res.json(project);
  } catch (e) {
    return res.status(500).json({
      errors: [{ msg: "Error in Fetching project" }],
    });
  }
});

/**
 * @method - DELETE
 * @description - Delete project
 * @param - /project/id
 */
router.delete("/project/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const project = await Project.findById(id);
    const results = await Project.deleteOne(project);
    res.json(results);
  } catch (e) {
    return res.status(500).json({
      errors: [{ msg: "Error in Deleting project" }],
    });
  }
});

/**
 * @method - PUT
 * @description - Update project
 * @param - /project/id
 */
router.put("/project/:id", async (req, res) => {
  try {
    const id = req.params.id;
    let { name, description, status, hours, cost, members } = req.body;
    hours = hours || 0;
    cost = cost || 0;
    const project = await Project.findByIdAndUpdate(
      id,
      {
        name,
        description,
        status,
        hours,
        cost,
        members,
      },
      { new: true }
    );
    res.json(project);
  } catch (e) {
    return res.status(500).json({
      errors: [{ msg: "Error in Updating project" }],
    });
  }
});

// project members

router.post(
  "/project/:id/member",
  [check("memberId", "Please Enter a member Id").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const { id } = req.params;
    const { memberId } = req.body;
    try {
      let project = await Project.findById(id);
      project.members.push(memberId);
      await project.save();
      res.status(200).json(project);
    } catch (err) {
      return res.status(500).json({
        errors: [{ msg: "Error in Saving" }],
      });
    }
  }
);

module.exports = router;
