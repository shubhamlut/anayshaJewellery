const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "shubhamissmartboy";
var fetchUsers = require("../middleware/fetchuser");
const Cart = require("../models/Cart");

//Route 1 : Add item to cart

router.post("/addtocart", fetchUsers, async (req, res) => {
  try {
    Cartproducts = await Cart.create({
      user: req.user.id,
      order: req.body.order,
      orderAmount: req.body.orderAmount,
      orderName: req.body.orderName,
    });
    res.status(200).send("Added to cart");
  } catch (error) {
    res.status(400).send("Internal Server Error");
  }
});

//Route 2: Remove item from cart

router.post("/removefromcart/:id", fetchUsers, async (req, res) => {
  try {
    item = await Cart.findOne({ order: req.params.id });
    console.log(req.params.id);
    if (!item) {
      res.status(404).send("item is not added in cart itself");
    }

    if (!item.user === req.user.id) {
      res.status(400).send("User is not owner of the cart");
    }

    itemRemoved = await Cart.deleteOne({ order: req.params.id });
    res.status(200).send(itemRemoved);
  } catch (error) {
    res.status(400).send("Internal Server Error");
  }
});

//Router 3: Get all items of cart

router.get("/getalladdeditems", fetchUsers, async (req, res) => {
  items = await Cart.find({ user: req.user.id });
  res.status(200).json(items);
});

module.exports = router;
