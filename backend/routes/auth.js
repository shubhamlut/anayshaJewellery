const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//const users = require("../models/Users");
const JWT_SECRET = "shubhamissmartboy";
var fetchUsers = require("../middleware/fetchuser");

//Route 1 : Create User (This would be without login)

router.post(
  "/createuser",
  [
    body("name", "Enter the valid name").isLength({ min: 3 }),
    body("email", "Enter the valid email").isEmail(),
    body("password", "Enter the valid password").isLength({ min: 6 }),
  ],

  async (req, res) => {
    errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.send("Email already exists");
    }
    try {
      var salt = await bcrypt.genSaltSync(10);
      var securedPassword = await bcrypt.hashSync(req.body.password, salt);
      let category = "";
      if (!req.body.category) {
        category = "User";
      } else {
        category = "Admin";
      }
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securedPassword,
        category: category
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const jwtData = jwt.sign(data, JWT_SECRET);
      res.json({ jwtToken: jwtData, success: true });
    } catch (error) {
      res.json({
        error: "Something went wrong",
        message: error.message,
        success: false,
      });
    }
  }
);

//Router 2: Get User details (Login Required)

router.get("/getuserdetails", fetchUsers, async (req, res) => {
  userId = req.user.id;
  const user = await User.findById(userId);
  res.status(200).send(user);
});

//Router 3: Login

router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    const { email, password } = req.body;
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors });
    }
    try {
      let user = await User.findOne({ email });
      console.log(user);

      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try to login with valid credentials" });
      }

      let passwordCompare = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Please try to login with valid credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const jwtData = jwt.sign(data, JWT_SECRET);
      res.status(200).json({ status: "Successful", jwtToken: jwtData,category:user.category });
    } catch (error) {
      res.status(400).json({ error: "Internal Server Error" });
    }
  }
);

//Route 4: Update password

router.post(
  "/updatepassword",
  [body("password", "Enter the valid password").isLength({ min: 6 })],
  fetchUsers,
  async (req, res) => {
    errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      var salt = await bcrypt.genSaltSync(10);
      var securedPassword = await bcrypt.hashSync(req.body.password, salt);

      order = await User.findByIdAndUpdate(
        req.user.id,
        { $set: { password: securedPassword } },
        { new: true }
      );

      console.log(order);
      res.status(200).send("Password Updated");
    } catch (error) {
      res.status(400).json({ error: "Internal Server Error" });
    }
  }
);

//Route 5: Add/Update Shipping address

router.post(
  "/updateshippingaddress",
  [
    body("shippingAddress", "Enter Valid shipping address").isLength({
      min: 8,
    }),
  ],
  fetchUsers,
  async (req, res) => {
    errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      user = await User.findByIdAndUpdate(
        req.user.id,
        { $set: { shippingAddress: req.body.shippingAddress } },
        { new: true }
      );

      res.status(200).send("Address Updated");
    } catch (error) {
      res.status(400).json({ error: "Internal Server Error" });
    }
  }
);
module.exports = router;
