const express = require("express");
const router = express.Router();
const Orders = require("../models/Orders");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "shubhamissmartboy";
var fetchUsers = require("../middleware/fetchuser");

//Route 1: Get all the orders of specfic users (Login required)

router.get("/getuserorders", fetchUsers, async (req, res) => {
  userId = req.user.id;
  const orders = await Orders.find({ user: userId });
  
  res.status(200).send(orders);
});


//Route 2: Place/Create Order for specific user (Login required)

router.post("/createorder", fetchUsers, async (req, res) => {
  try {
    userId = req.user.id;
    console.log(userId);
    const order = await Orders.create({
      user: userId,
      orderName: req.body.orderName,
      orderDescription: req.body.orderDescription,
      orderStatus: req.body.orderStatus,
      orderAmount: req.body.orderAmount,
      shippingAddress: req.body.shippingAddress,
    });

    res.status(200).send(order);
  } catch (error) {
    console.log(error);
    res.status(400).send("Internal Server Error");
  }
});

//Route 3: Cancel Order (Login Required)

router.post("/cancelorder/:id", fetchUsers, async (req, res) => {
    try {
    userId = req.user.id;
    let order = await Orders.findById(req.params.id);
    if (!order) {
      res.status(404).send("Not Found");
    }

    if (!order.user.toString() === req.user.id) {
      res.status(401).send("Not allowed");
    }

    order = await Orders.findByIdAndUpdate(
      req.params.id,
      { $set: { orderStatus: "Cancelled" } },
      { new: true }
    );
    res.status(200).send(order);
  } catch (error) {
    res.status(400).send("Internal Server Error");
  }
});

      module.exports = router;