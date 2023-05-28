import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../stylesheets/Mybag.css";
import BagItems from "./BagItems";
const Mybag = () => {
  let retrievedItems = "";
  
  const [items, setItems] = useState([{}]);
  const [totalAmount,setTotalAmount] = useState(0)
  const[totalNumberOfItems,setTotalNumberOfItems] = useState(0)

  //Server side add to bag logic
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

    getMyBagItems();
  };

  //Server side get bag items
  const getMyBagItems = async () => {
    const response = await fetch(
      `http://localhost:5000/api/cart/getalladdeditems`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    retrievedItems = await response.json();
    
    //Adding index to array of objects
    let indexedItems = retrievedItems.map((item, index) => ({
      ...item,
      index: index + 1,
    }));

    //Calculating the count of similar objects
    const countByObject = indexedItems.reduce((obj, item) => {
      obj[item.order] = (obj[item.order] || 0) + 1;
      return obj;
    }, {});

    //Filtering out the unique objects
    const uniqueItems = indexedItems.filter(
      (obj, index, self) =>
        index === self.findIndex((o) => o.order === obj.order)
    );
    // console.log("Unique", uniqueItems);

    //Converting object to array of object
    const arr = Object.entries(countByObject).map(([key, value]) => ({
      id: key,
      count: value,
    }));

    // console.log("count", arr);

    //Merging both arrays
    const mergedArray = uniqueItems.map((obj1) => {
      const obj2 = arr.find((obj2) => obj2.id === obj1.order);
      return { ...obj1, ...obj2 };
    });

    // console.log("merged", mergedArray);
    setItems(mergedArray);
    setTotalAmount(retrievedItems
      .reduce((accumulator, item) => accumulator + item.orderAmount, 0)
      .toString());

      setTotalNumberOfItems(retrievedItems.length)
  };
 

  //Server sider remove item from bag
  const removeItemFromBag = async (productId, index) => {
    let itemRemoved = "";
    const response = await fetch(
      `http://localhost:5000/api/cart/removefromcart/${productId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    itemRemoved = await response.json();

    getMyBagItems();
  };
  const location = useLocation();
  useEffect(() => {
    const handlePageLoad = () => {
      // Call your function or perform desired action here
      console.log("Navigated to the userDetails page");
      getMyBagItems();
    };

    // Check if the current location matches the target page path
    if (location.pathname === "/mybag") {
      handlePageLoad();
    }
  }, [location]);

  return (
    <>
      <h2>My Bag</h2>
      <div className="mybag-parentContainer">
        <div className="mybag-Container">
          {items.map((item) => (
            <BagItems
              orderAmount={item.orderAmount}
              orderName={item.orderName}
              orderId={item.order}
              count={item.count}
              index={item.index}
              removeItemFromBag={removeItemFromBag}
              AddToBag={AddToBag}
            />
          ))}
        </div>
        <div className="subtotal">
          Subtotal ({totalNumberOfItems} items):₹{totalAmount}
          <button className="proceedToCheckout">Proceed to checkout</button>
        </div>
      </div>
    </>
  );
};

export default Mybag;
