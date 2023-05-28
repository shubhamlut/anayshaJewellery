import React from "react";

const BagItems = (props) => {
  return (
    <div className="orderItem">
      <div className="orderInfo">
        <p>{props.orderName}</p>
        <p>₹{props.orderAmount}</p>
      </div>
      <div className="remove-add-button">
      <i class="fa-solid fa-circle-minus" onClick={()=>props.removeItemFromBag(props.orderId,props.index)}></i>
     <div>{props.count}</div>
      <i class="fa-solid fa-circle-plus" onClick={()=>props.AddToBag(props.orderId,props.orderAmount,props.orderName)}></i>
      </div>
    </div>
  );
};

export default BagItems;
