import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Finejewellery from "./Finejewellery";
import HighJewellery from "./HighJewellery";
import Hoverpopper from "./Hoverpopper";

let offsetX = "";
let offsetY = "";
const Navbar = () => {
  const onHover = (e) => {
    // console.log("Nav");
    setIsHovering(true);
    //e.target.classList.add("fa-rotate-180");
  };

  const onHoverOut = (e) => {
    // e.target.classList.toggle("fa-rotate-180");
    setIsHovering(false);
  };

  const [isHovering, setIsHovering] = useState(false);

  return (
    <>
      <div>
        <div className="container-header">
          <div className="Header">Anaysha</div>
        </div>
        <div className="container-navbar">
          <div className="NavOne" >
            <div >
              <Hoverpopper
                children={<HighJewellery />}
                lable={"High Jewellery"}
                icon={
                  <i
                    className="fa-solid fa-angle-down"
                  ></i>
                }
                offset={{ offsetX: "400", offsetY: "235" }}
                
              />
            </div>
          </div>

          <div className="NavTwo">
            <div onMouseOut={onHoverOut}>
              <Hoverpopper
                children={<Finejewellery />}
                lable={"Fine Jewellery"}
                icon={
                  <i
                    className="fa-solid fa-angle-down"
                    onMouseOver={onHover}
                  ></i>
                }
                offset={{ offsetX: "600", offsetY: "235" }}
              />
            </div>
          </div>
          <div className="NavThree">
            Bescope Design
            
          </div>
          <div className="NavFour">
            Sustainability
            <i
              className="fa-solid fa-angle-down"
              onMouseOver={onHover}
              onMouseOut={onHoverOut}
            ></i>
          </div>
          <div className="NavFive">Contact</div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
