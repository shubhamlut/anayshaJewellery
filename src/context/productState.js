import { useState, useEffect } from "react";
import ProductContext from "./productContext";

const ProductState = (props) => {
  const [showProducts, setShowProducts] = useState(false);
  const [products, setProducts] = useState();
  const [filterProducts, setFilterProducts] = useState();
  let retrievedProducts = "";

  useEffect(() => {
    getallproducts();
  }, []);
  const getallproducts = async () => {
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
    setProducts(retrievedProducts);
    setFilterProducts(retrievedProducts);
    setShowProducts(true);
  };

  const getproductsbyfilter = async (filterBy) => {
    if (filterBy.length > 0) {
      setFilterProducts(
        products.filter((object) => filterBy.includes(object.productCategory))
      );
      setShowProducts(true);
    } else {
      setFilterProducts(products);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        showProducts,
        getallproducts,
        products,
        getproductsbyfilter,
        filterProducts,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;
