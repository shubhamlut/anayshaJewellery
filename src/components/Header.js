import { color } from "@mui/system";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import HighJewellery from "./HighJewellery";
import Hoverpopper from "./Hoverpopper";

const Header = () => {
  const onHover = (e) => {
    console.log(e);
    e.target.classList.add("dark");
    setIsHovering(true);
  };

  const onHoverOut = (e) => {
    // e.target.classList.toggle("fa-rotate-180");
    e.target.classList.remove("dark");
    setIsHovering(false);
  };

  const [isHovering, setIsHovering] = useState(false);
  return (
    <>
      <div className="container">
        <div className="header-container-one">
          <Link className="header-item" to="/">
            HOME
          </Link>

          <Link className="header-item" to="/limitededition">
            LIMITED EDITION
          </Link>
          <Link className="header-item" to="/oneofkind">
            ONE OF A KIND JEWELLERY
          </Link>
        </div>
        <div className="header-container-two">
          <div className="header-button">
            <Link className="Link" aria-current="page" to="/wishlist">
              <i
                className="fa-solid fa-heart"
                onMouseOver={onHover}
                onMouseOut={onHoverOut}
              ></i>
            </Link>
          </div>
          <div className="header-button">
            <Link className="Link" aria-current="page" to="/search">
              <i
                class="fa-sharp fa-solid fa-magnifying-glass"
                onMouseOver={onHover}
                onMouseOut={onHoverOut}
              ></i>
            </Link>
          </div>
          <div className="header-button">
            <Link className="Link" aria-current="page" to="/userdetails">
              <i
                class="fa-solid fa-user"
                onMouseOver={onHover}
                onMouseOut={onHoverOut}
              ></i>
            </Link>
          </div>
          <div className="header-button">
            <Link className="Link" aria-current="page" to="/mybag">
              <i
                class="fa-solid fa-bag-shopping"
                onMouseOver={onHover}
                onMouseOut={onHoverOut}
              ></i>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
