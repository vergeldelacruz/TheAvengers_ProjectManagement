const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("../middleware/auth");
const { getRandAvatar } = require("../config/avatars");
/**
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */

const User = require("../model/User");
router.post(
  "/signup",
  [
    check("email", "Please Enter a valid email").isEmail().not().isEmpty(),
    check("firstName", "Please Enter a valid first name").not().isEmpty(),
    check("lastName", "Please Enter a valid last name").not().isEmpty(),
    check("jobTitle", "Please Enter a valid job title").not().isEmpty(),
    check("role", "Please Enter a valid role").not().isEmpty(),
    check("password", "Please enter a valid password").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { email, password, firstName, lastName, jobTitle, role } = req.body;
    try {
      let user = await User.findOne({
        email,
      });
      if (user) {
        return res.status(400).json({
          msg: "User Already Exists",
        });
      }

      let avatar = getRandAvatar();
      user = new User({
        email,
        password,
        firstName,
        lastName,
        jobTitle,
        role,
        avatar
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        "randomString",
        {
          expiresIn: 10000,
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token,
            user: user
          });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Error in Saving");
    }
  }
);

router.post(
  "/login",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({
        email,
      });
      if (!user)
        return res.status(400).json({
          message: "User Not Exist",
        });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({
          message: "Incorrect Password !",
        });

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        "randomString",
        {
          expiresIn: 3600,
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token,
          });
        }
      );
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Server Error",
      });
    }
  }
);

/**
 * @method - GET
 * @description - Get LoggedIn User
 * @param - /me
 */

router.get("/me", auth, async (req, res) => {
  try {
    // request.user is getting fetched from Middleware after token authentication
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
});

/**
 * @method - GET
 * @description - Get Users
 * @param - /users
 */
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (e) {
    res.send({ message: "Error in Fetching users" });
  }
});

/**
 * @method - GET
 * @description - Get User
 * @param - /user/id
 */
router.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
});

/**
 * @method - DELETE
 * @description - Delete User
 * @param - /user/id
 */
router.delete("/user/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    const results = await User.deleteOne(user);
    res.json({
      message: "User deleted successfully",
      results: results,
      status: true,
    });
  } catch (e) {
    console.log(e.message)
    res.send({ 
      error: {
        message: e.message
      }
    });
  }
});

/**
 * @method - PUT
 * @description - Update User
 * @param - /user/id
 */
router.put("/user/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { firstName, lastName, jobTitle, role } = req.body;
    const user = await User.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        jobTitle,
        role
      },
      { new: true }
    );
    res.json(user);
  } catch (e) {
    res.send({ message: "Error in Updating user" });
  }
});
module.exports = router;
