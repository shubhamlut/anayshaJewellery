import React, { useEffect, useState } from "react";
import "../stylesheets/ProductCSS.css";
const Product = (props) => {
  return (
    <div className="product-card">
      <div className="product-image">
        <img
          src={`data:image/png;base64,${props.productImage}`}
          width={190}
          height={200}
          alt=""
        />
      </div>
      <div className="product-name">{props.productName}</div>
      <div className="product-price">₹{props.productPrice}</div>
      <div className="actionbuttons">
        <div>
          <i
            class="fa-sharp fa-solid fa-heart"
            onClick={() => props.addtowishlist(props.productId)}
          >
            {" "}
          </i>
        </div>
        <div>
          <button className="addtobagbutton">View details</button>
        </div>
        <div>
          <button
            className="addtobagbutton"
            onClick={() => props.AddToBag(props.productId, props.productPrice,props.productName)}
          >
            Add to bag
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
