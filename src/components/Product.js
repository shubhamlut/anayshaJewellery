import React, { useEffect, useState } from "react";
import "../stylesheets/ProductCSS.css";
const Product = (props) => {
  return (
    <div className="product-card">
      <div>
        <img
          className="product-image"
          src={`data:image/png;base64,${props.productImage}`}
          // width={240}
          // height={200}
          alt=""
        />
      </div>
      <div className="product-name">{props.productName}</div>
      <div className="product-description">{props.productDescription}</div>
      <div className="product-price">₹{props.productPrice}</div>
      <div className="actionbuttons">
        <div>
          <i
            class="fa-sharp fa-solid fa-heart"
            onClick={() => props.addtowishlist(props.productId)}
          ></i>
        </div>
        <span className="rating-number">5</span>
        <div className="rating-star">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </div>
        <div>
          <button className="addtobagbutton" onClick={()=>props.handleviewdetails(props.productId)}>
            View details
          </button>
        </div>
       
      </div>
    </div>
  );
};

export default Product;
