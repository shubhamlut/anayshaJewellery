import React, { useEffect, useState } from "react";
import imageOne from "../images/alyssa-strohmann-qOIGvGoVNtc-unsplash.jpg";
import imageTwo from "../images/anastasia-anastasia-nlQFycTD04M-unsplash.jpg";
import imageThree from "../images/lilartsy-ZhmbakzCBtk-unsplash.jpg";
import imageFour from "../images/tara-yates-ZL7JpQ3d1Yk-unsplash.jpg";
import Product from "./Product.js";
import SliderImages from "./SliderImages";
const SubBody = () => {
  const [product, setProduct] = useState([{}]);
  let retrievedProducts = "";

  useEffect(() => {
    onPageLoad();
  }, []);

  const AddToBag = async (orderId, orderPrice,orderName) => {
    console.log(orderId);
    const response = await fetch(`http://localhost:5000/api/cart/addtocart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        order: orderId,
        orderAmount: orderPrice,
        orderName: orderName
      }),
    });
  };

  const addtowishlist = async (orderId) => {
    console.log("wish list");

    const response = await fetch(`http://localhost:5000/api/likes/addtolike`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        order: orderId
      }),
    });
  };
  //This is called by above useEffect hook
  const onPageLoad = async () => {
    console.log();
    const response = await fetch(
      `http://localhost:5000/api/product/getallproducts`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    retrievedProducts = await response.json();
    setProduct(retrievedProducts);
    console.log(retrievedProducts);
  };

  return (
    
     
      
     <div className="test">
      {/* <SliderImages/> */}
    <div className="productcardContainer">
      {product.map((item) => (
        <Product
          productName={item.productName}
          productImage={item.productImage}
          productPrice={item.productPrice}
          productId={item.productId}
          AddToBag={AddToBag}
          addtowishlist={addtowishlist}
        />
      ))}
    </div>
    </div>
    
  );
};

export default SubBody;
