import React, { useState } from "react";

const Addproductmodal = (props) => {
  const [addProductDetails, setAddProductDetails] = useState({
    productName: "",
    productDescription: "",
    productCategory: "",
    productPrice: "",
    productImages: null,
  });

  const onChange = (e) => {
    setAddProductDetails({
      ...addProductDetails,
      [e.target.name]: e.target.value,
    });
    console.log(addProductDetails);
  };

  const handleFileChange = (event) => {
    setAddProductDetails({ ...addProductDetails, file: event.target.files[0] });
  };

  const onSubmitHandle = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("productImages", addProductDetails.file);
    formData.append("productName", addProductDetails.productName);
    formData.append("productDescription", addProductDetails.productDescription);
    formData.append("productCategory", addProductDetails.productCategory);
    formData.append("productPrice", addProductDetails.productPrice);

    console.log(formData);
    const response = await fetch(
      `http://localhost:5000/api/product/uploadproduct`,
      {
        method: "POST",
        body: formData,
        // headers: {
        //   "Content-Type": "application/json",
        // },
        // body: JSON.stringify({
        //   productName: addProductDetails.productName,
        //   productDescription: addProductDetails.productDescription,
        //   productCategory: addProductDetails.productCategory,
        //   productPrice: addProductDetails.productPrice,
        //   productImages: file
        // }),
      }
    );
    const json = await response.json();
    console.log(json);
  };

  return (
    <div>
      <form
        onSubmit={onSubmitHandle}
        className="addproductModal"
        id="form"
        action=""
      >
        <button onClick={props.closeAddProductModal}>X</button>
        <label htmlFor="productName">Product Name</label>
        <input
          type="text"
          className="productName"
          id="productName"
          name="productName"
          value={addProductDetails.productName}
          onChange={onChange}
        />
        <label htmlFor="productDescription">Product Description</label>
        <input
          type="text"
          className="productDescription"
          id="productDescription"
          name="productDescription"
          value={addProductDetails.productDescription}
          onChange={onChange}
        />
        <label htmlFor="productCategory">Product Category</label>
        <input
          type="text"
          className="productCategory"
          id="productCategory"
          name="productCategory"
          value={addProductDetails.productCategory}
          onChange={onChange}
        />
        <label htmlFor="productPrice">Product Price</label>
        <input
          type="text"
          className="productPrice"
          id="productPrice"
          name="productPrice"
          value={addProductDetails.productPrice}
          onChange={onChange}
        />
        <label htmlFor="productImage">Product Image</label>
        <input
          type="file"
          className="productImage"
          id="productImage"
          name="productImages"
          onChange={handleFileChange}
        />
        <input type="submit" className="submitButton" value="Submit" />
      </form>
    </div>
  );
};

export default Addproductmodal;
