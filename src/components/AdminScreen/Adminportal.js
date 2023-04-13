import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Addproductmodal from "./Addproductmodal";

const Adminportal = () => {
  const navigate = useNavigate();
  let retrievedProducts = "";

  //useState for product those are displayed on the dashboard
  const [product, setProduct] = useState([
    {
      productName: "test",
      productDescription: "test",
      productPrice: "test",
      productCategory: "test",
      productImage: "test",
    },
  ]);


  const [showModal,setShowModal] = useState(false)


  //This function is used to logout from the application
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/adminshubhamlutade");
  };

  //This function is used to add the product
  const addProduct = () => {
    setShowModal(true)
  };

  const closeAddProductModal = () => {
    setShowModal(false)
  };

  //This is triggered on page load
  useEffect(() => {
    onPageLoad();
  }, []);

  //This is called by above useEffect hook
  const onPageLoad = async () => {
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
  };

  //This is Admin portal UI
  return (
    <div>
      <div className="loginHeader">
        <h2>Admin Portal</h2>
      </div>

      <div>
        <p>This is admin portal. Dashboard building in progress</p>
        <button onClick={logout}>Logout</button>
        <button onClick={addProduct}>Add Product</button>
      </div>
<div>{showModal && <Addproductmodal closeAddProductModal = {closeAddProductModal}/>}</div>
      <table>
        <thead>
        <tr>
          <th>Product Name</th>
          <th>Product Description</th>
          <th>Product Price</th>
          <th>Product Category</th>
          <th>Product Image</th>
        </tr>
        </thead>
        <tbody>
          {product.map((item) => (
            <tr>
              <td>{item.productDescription}</td>
              <td>{item.productCategory}</td>
              <td>{item.productPrice}</td>
              <td>{item.productName}</td>
              <td>
                <img
                  src={`data:image/png;base64,${item.productImage}`}
                  width={100}
                  height={100}
                  alt=""
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Adminportal;
