import React from "react";

const Checkbox = (props) => {
  const onClick = (e) => {
    props.handleCheckBoxSelection(e);
    
  };
  return (
    <div>
      <input
        type="checkbox"
        id={props.id}
        name={props.name}
        value={props.value}
        onChange={onClick}
      ></input>
      <label for={props.name}> {props.label}</label>
      <br></br>
    </div>
  );
};

export default Checkbox;
