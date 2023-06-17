import React, { useContext, useState } from "react";
import Checkbox from "./Checkbox";
import Dropdownfilter from "./Dropdownfilter";
import productContext from "../context/productContext";
const Filters = () => {
  const [filterBy, setFilterBy] = useState([]);
  const product = useContext(productContext);

  //This function is used to handle the checkbox selection
  const handleCheckBoxSelection = (e) => {
    console.log(e.target.checked);
    const value = e.target.value;
    if (e.target.checked) {
      filterBy.push(value);
    } else {
      const index = filterBy.indexOf(value);
      if (index > -1) {
        filterBy.splice(index, 1);
      }
    }
    product.getproductsbyfilter(filterBy);
  };

  //This function is used to handle the dropdown selection

  const handleDropdownSelection = (e) => {
    console.log(e.target.value);
  };
  return (
    <div className="HomePageContainer">
      <div className="menus">
        <h4>Filter</h4>
        <p>Category</p>
        <Checkbox
          id="ring"
          name="ring"
          value="ring"
          label="Ring"
          handleCheckBoxSelection={handleCheckBoxSelection}
        />
        <Checkbox
          id="necklace"
          name="necklace"
          value="necklace"
          label="Necklace"
          handleCheckBoxSelection={handleCheckBoxSelection}
        />
        <Checkbox
          id="mangalsutra"
          name="mangalsutra"
          value="mangalsutra"
          label="Mangalsutra"
          handleCheckBoxSelection={handleCheckBoxSelection}
        />
        <Checkbox
          id="marriageJewellery"
          name="marriageJewellery"
          value="marriageJewellery"
          label="Marriage Jewellery"
          handleCheckBoxSelection={handleCheckBoxSelection}
        />
        <p>Sort by</p>
        <select
          className="dropdownfilter"
          onChange={handleDropdownSelection}
        >
          <Dropdownfilter value="newest" label="Newest" />
          <Dropdownfilter value="oldest" label="Oldest" />
          <Dropdownfilter value="lowtohighprice" label="Low to High price" />
          <Dropdownfilter value="hightolowprice" label="High to Low price" />
        </select>
      </div>
    </div>
  );
};

export default Filters;
