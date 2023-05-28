import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Addproductmodal from "./Addproductmodal";
import UpdateProductModal from "./UpdateproductModal";
import "../AdminScreenCSS/AddproductModal.css";
import Loader from "./Loader";
import Admintable from "./Admintable";
import loaderContext from "../../context/loaderContext";
const Adminportal = () => {
  const navigate = useNavigate();
  let retrievedProducts = "";
  const Spinner = useContext(loaderContext);
  //useState for product those are displayed on the dashboard
  const [product, setProduct] = useState([{}]);

  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState("");
  const [btnUpdateProduct, setBtnUpdateProduct] = useState(true);
  const [showUpdateProductModal, setShowUpdateProductModal] = useState(false);
  const [productUpdate, setProductUpdate] = useState(0);
  const [showTable, setShowTable] = useState(false);
  

  const onProductUpdate = () => {
    console.log("Upadte");
    setProductUpdate(productUpdate + 1);
  };

  useEffect(() => {
    onPageLoad();
  }, [productUpdate]);

  const handleRowClick = (item) => {
    setSelectedRow(item);
    setBtnUpdateProduct(false);
    console.log("test11", item);
  };

  const deleteProduct = async (item) => {
    console.log("delete", item);
    const response = await fetch(
      `http://localhost:5000/api/product/deleteproduct/${item.productId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();
    if (json.status) {
      onProductUpdate();
    }
  };
  //This function is used to logout from the application
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/adminshubhamlutade");
  };

  //This function is used to add the product
  const addProduct = () => {
    setShowModal(true);
    document.body.classList.add("modal-open");
  };

  const updateProduct = () => {
    setShowUpdateProductModal(true);
  };

  const closeUpdateProductModal = () => {
    setShowUpdateProductModal(false);
  };
  const closeAddProductModal = () => {
    setShowModal(false);
  };

  //This is triggered on page load
  useEffect(() => {
    onPageLoad();
  }, []);

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
    setShowTable(true);
    Spinner.closeLoader();
  };

  //This is Admin portal UI
  return (
    <div className="adminPortal">
      <div className="container">
        <button onClick={addProduct}>Add Product</button>
        <button onClick={updateProduct} disabled={btnUpdateProduct}>
          Update Product
        </button>
        <div className="loginHeader">
          <h2>Admin Portal</h2>
        </div>
        <div className="logoutButton">
          <button onClick={logout}>Logout</button>
        </div>
      </div>
      <div>
        {showModal && (
          <Addproductmodal
            closeAddProductModal={closeAddProductModal}
            onProductUpdate={onProductUpdate}
          />
        )}
        {showUpdateProductModal && (
          <UpdateProductModal
            closeUpdateProductModal={closeUpdateProductModal}
            selectedProduct={selectedRow}
            updateProduct={updateProduct}
            onProductUpdate={onProductUpdate}
          />
        )}
      </div>
      <div>{Spinner.loader && <Loader />}</div>
      {showTable && (
        <Admintable
          product={product}
          handleRowClick={handleRowClick}
          selectedRow={selectedRow}
          deleteProduct={deleteProduct}
        />
      )}
    </div>
  );
};

export default Adminportal;
