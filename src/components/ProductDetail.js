import { useParams } from "react-router-dom";
import React, { useEffect, useState, useContext, navigate } from "react";
import loaderContext from "../context/loaderContext";
import Loader from "./AdminScreen/Loader";
const ProductDetail = () => {
  const [product, setProduct] = useState();
  const [showProductDetail, setShowProductDetail] = useState(false);
  const AddToBag = async (orderId, orderPrice, orderName) => {
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
        orderName: orderName,
      }),
    });
  };
  let retrievedProduct = "";
  const Spinner = useContext(loaderContext);
  useEffect(() => {
    onPageLoad();
  }, []);
  const { productId } = useParams();
  const onPageLoad = async () => {
    const response = await fetch(
      `http://localhost:5000/api/product/getproduct/${productId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    retrievedProduct = await response.json();
    console.log(retrievedProduct)
    setProduct(retrievedProduct);
    setShowProductDetail(true);
    Spinner.closeLoader();
  };
  
  return (
    <>
      <div>{Spinner.loader && <Loader />}</div>

      { showProductDetail && (<div className="productDetail-container">
        <div className="product-card">
          <div>
            <img
              className="product-image"
              src={`data:image/png;base64,${product.productImage}`}
              // width={240}
              // height={200}
              alt=""
            />
          </div>
          <div className="product-name">{product.productName}</div>
          <div className="product-description">
            {product.productDescription}
          </div>
          <div className="product-price">₹{product.productPrice}</div>
        </div>
        <div>
          <button
            className="addtobagbutton"
            onClick={() =>
              AddToBag(
                product.productId,
                product.productPrice,
                product.productName
              )
            }
          >
            Add to bag
          </button>
        </div>
      </div>)}
    </>
  );
};

export default ProductDetail;
