import React, { useState, useEffect } from "react";

const UpdateProductModal = (props) => {
  //console.log(props.selectedProduct.productName)
  const [addProductDetails, setAddProductDetails] = useState({
    productName: "",
    productDescription: "",
    productCategory: "",
    productPrice: "",
    productImages: null,
  });
  function base64toFile(base64String, filename, contentType) {
    // Decode the base64 string to a byte array
    const byteCharacters = atob(base64String);

    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    // Create a new Blob object from the byte array
    const blob = new Blob([byteArray], { type: contentType });

    // Create a new File object from the Blob object
    const file = new File([blob], filename, { type: contentType });
    return file;
  }
  useEffect(() => {
    let file = base64toFile(
      props.selectedProduct.productImage,
      "fileName.jpeg",
      "image/png"
    );
    onPageLoad(file);
  }, [props.selectedProduct]);
  const onPageLoad = (file) => {
    //console.log(file)
    setAddProductDetails({
      productName: props.selectedProduct.productName,
      productDescription: props.selectedProduct.productDescription,
      productCategory: props.selectedProduct.productCategory,
      productPrice: props.selectedProduct.productPrice,
      productImages: file,
    });
  };
  const onChange = (e) => {
    setAddProductDetails({
      ...addProductDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (event) => {
    setAddProductDetails({
      ...addProductDetails,
      productImages: event.target.files[0],
    });
  };

  const onSubmitHandle = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productImages", addProductDetails.productImages);
    formData.append("productName", addProductDetails.productName);
    formData.append("productDescription", addProductDetails.productDescription);
    formData.append("productCategory", addProductDetails.productCategory);
    formData.append("productPrice", addProductDetails.productPrice);

    const response = await fetch(
      `http://localhost:5000/api/product/updateproduct/${props.selectedProduct.productId}`,
      {
        method: "POST",
        body: formData,
      }
    );
    const json = await response.json();
    if (json.status) {
      props.onProductUpdate();
    }
  };

  return (
    <div>
      <form
        onSubmit={onSubmitHandle}
        className="addproductModal"
        id="form"
        action=""
      >
        <a onClick={props.closeUpdateProductModal} className="closeAddModal">
          <span class="close">&times;</span>
        </a>

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

export default UpdateProductModal;
