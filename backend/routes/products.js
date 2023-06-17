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
    res.json({ message: "File Uploaded", status: true });
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

    if (req.file !== undefined) {
      newImage = fs.readFileSync("productImages/" + req.file.filename);
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
    res.json({ product: product, status: true });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//Route 4: Delete Product

router.post("/deleteproduct/:id", async (req, res) => {
  try {
    product = await Products.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Deleted Successfully", status: true });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//Route 5: Get product by id

router.get("/getproduct/:id", async (req, res) => {
  try {
    product = await Products.findById(req.params.id);

    res.status(200).json({
      productId: product._id,
      productName: product.productName,
      productDescription: product.productDescription,
      productPrice: product.productPrice,
      productCategory: product.productCategory,
      productImage: btoa(arrayBufferToString(product.productImage.data)),
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});


//Route 6: Get products by filter
router.post("/getproductsbyfilter", async (req, res) => {
 console.log(req.body)
  const allproducts = await Products.find({productCategory:{$in:req.body.filterBy}});

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

module.exports = router;
