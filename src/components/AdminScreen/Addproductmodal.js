import React ,{useState}from "react";

const Addproductmodal = (props) => {

  return (
    <div>
      <form className="addproductModal" action="">
<button onClick={props.closeAddProductModal}>X</button>
        <label htmlFor="productName">Product Name</label>
        <input type="text" className="productName" id="productName" name="productName" />
        <label htmlFor="productDescription">Product Description</label>
        <input type="text" className="productDescription" id="productDescription" name="productDescription" />
        <label htmlFor="productCategory">Product Category</label>
        <input type="text" className="productCategory" id="productCategory" name="productCategory" />
        <label htmlFor="productPrice">Product Price</label>
        <input type="text" className="productPrice" id="productPrice" name="productPrice" />
        <label htmlFor="productImage">Product Image</label>
        <input type="file" className="productImage" id="productImage" name="productImage" />
        <input
          type="submit"
          className="submitButton"
          value="Submit"
        />
      </form>
    </div>
  );
};

export default Addproductmodal;
