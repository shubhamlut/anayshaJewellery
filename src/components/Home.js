import React, { useEffect } from "react";
import Body from "./Body";
import Header from "./Header";
import Navbar from "./Navbar";
import SubBody from "./SubBody";
import Filters from "./Filters";

const Home = (props) => {
  return (
    <div>
      <Body />
      <div className="home">
        <Filters />
        <SubBody products={props.products} showproducts={props.showproducts} />
      </div>
    </div>
  );
};

export default React.memo(Home);
