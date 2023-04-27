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
  console.log(req.file);
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

  let modifiedProducts = allproducts.map((singleProduct) => {
    return {
      productId: singleProduct._id,
      productName: singleProduct.productName,
      productDescription: singleProduct.productDescription,
      productPrice: singleProduct.productPrice,
      productCategory: singleProduct.productCategory,
      productImage: btoa(arrayBufferToString(singleProduct.productImage.data)),
    };
  });
  res.status(200).send(modifiedProducts);
});

//Route 3: Update products

router.post("/updateproduct/:id", upload, async (req, res) => {
  try {
    
    let newImage = "";
    if (!req.file === undefined) {
      newImage = fs.readFileSync("productImages/" + req.file.filename);
      console.log(newImage)
    }
    product = await Products.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          productName: req.body.productName,
          productDescription: req.body.productDescription,
          productCategory: req.body.productCategory,
          productPrice: req.body.productPrice,
          productImage: {
            data: newImage,
            contentType: "image/jpeg",
          },
        },
      },
      { new: true }
    );

    res.status(200).send(product);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
