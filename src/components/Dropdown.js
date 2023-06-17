import React from "react";
import { Link, useNavigate } from "react-router-dom";
const Dropdown = (props) => {
  return (
    <>
      <li>
        <div className="dropdown-menu">
          <div className="dropdown-icon">
            <i class={props.icon}></i>
          </div>
          <div className="dropdown-text">
            <Link className="dpLink" to={props.navigateLink} onClick={props.execute}>{props.text} </Link>
          </div>
        </div>
        
      </li>

    </>
  );
};

export default Dropdown;
