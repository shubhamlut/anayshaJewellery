const express = require("express");
const router = express.Router();
const Products = require("../models/Products");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "shubhamissmartboy";
var fetchUsers = require("../middleware/fetchuser");
const multer = require("multer");
const fs = require("fs");
const { btoa } = require("buffer");

// const convertToBase64 = (file) => {
//   let reader = new FileReader();
//   reader.readAsDataURL(file)
//   console.log(reader)
// };

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "productImages");
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + ".jpg");
    },
  }),
}).single("productImages");

function arrayBufferToString(arrayBuffer) {
  let byteArray = new Uint16Array(arrayBuffer);
  let byteString = "";
  for (let i = 0; i < byteArray.length; i++) {
    byteString += String.fromCharCode(byteArray[i]);
  }
  return byteString;
}
//Route 1: Add products

router.post("/uploadproduct", upload, async (req, res) => {
  try {
    const newProduct = new Products({
      productName: req.body.productName,
      productDescription: req.body.productDescription,
      productPrice: req.body.productPrice,
      productCategory: req.body.productCategory,
      productImage: {
        data: fs.readFileSync("productImages/" + req.file.filename),
        contentType: "image/jpeg",
      },
    });
    await newProduct.save();
    res.send("File Uploaded");
  } catch (error) {
    res.status(400).send(error);
  }
});

//Route 2: Get all products
router.get("/getallproducts", async (req, res) => {
  const allproducts = await Products.find();
  allproducts.map((singleProduct) => {
    let data = arrayBufferToString(singleProduct.productImage.data);
    return res.status(200).json({ base64: btoa(data) });
  });
});

module.exports = router;
