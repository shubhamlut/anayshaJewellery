import React, { useEffect, useState, useContext, navigate } from "react";
import { useNavigate } from "react-router-dom";
import imageOne from "../images/alyssa-strohmann-qOIGvGoVNtc-unsplash.jpg";
import imageTwo from "../images/anastasia-anastasia-nlQFycTD04M-unsplash.jpg";
import imageThree from "../images/lilartsy-ZhmbakzCBtk-unsplash.jpg";
import imageFour from "../images/tara-yates-ZL7JpQ3d1Yk-unsplash.jpg";
import Product from "./Product.js";
import loaderContext from "../context/loaderContext";
import productContext from "../context/productContext";
import SliderImages from "./SliderImages";
import Loader from "./AdminScreen/Loader";
const SubBody = (props) => {
  const Spinner = useContext(loaderContext);
const productState = useContext(productContext)
  const [product, setProduct] = useState([{}]);
  const [showproducts, setShowproducts] = useState(true);
  const navigate = useNavigate();
  let retrievedProducts = "";

  const addtowishlist = async (orderId) => {
    const response = await fetch(`http://localhost:5000/api/likes/addtolike`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        order: orderId,
      }),
    });
  };

  const handleviewdetails = (productId) => {
    console.log("view product details");
    navigate(`/productdetails/${productId}`);
  };
  return (
    <div className="test">
      {/* <SliderImages/> */}
      {/* <div>{Spinner.loader && <Loader />}</div> */}
      <div>
        {productState.showProducts && (
          <div className="productcardContainer">
            {productState.filterProducts.map((item) => (
              <Product
                productName={item.productName}
                productImage={item.productImage}
                productDescription={item.productDescription}
                productPrice={item.productPrice}
                productId={item.productId}
                addtowishlist={addtowishlist}
                handleviewdetails={handleviewdetails}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SubBody;
