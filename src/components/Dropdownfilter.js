import React from "react";

const Dropdownfilter = (props) => {
  return (
    <>
      <option value={props.value}>{props.label}</option>
    </>
  );
};

export default Dropdownfilter;
