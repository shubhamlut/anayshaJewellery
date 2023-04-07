const express = require("express");
const router = express.Router();
const Likes = require("../models/Likes");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "shubhamissmartboy";
var fetchUsers = require("../middleware/fetchuser");
const Orders = require("../models/Orders");

//Route 1: Add to likes

router.post("/addtolike", fetchUsers, async (req, res) => {
  try {
    console.log(req.user.id, req.body.order);
    likes = await Likes.create({
      user: req.user.id,
      order: req.body.order,
    });

    res.status(200).send("Item added to likes folder");
  } catch (error) {
    res.status(400).send("Internal Server Error");
  }
});

//Route 2: Remove item from likes folder\

router.post("/removeLikedItem/:id", fetchUsers, async (req, res) => {
  try {
    item = await Likes.findOne({order:req.params.id});
    console.log(item)
    if (!item) {
      return res.status(404).send("Not Found");
    }

    itemRemoved = await Likes.deleteOne({order:req.params.id});
    res.status(200).send(itemRemoved);
  } catch (error) {
    res.status(400).send(error,"Internal Server Error");
  }
});

module.exports = router;
