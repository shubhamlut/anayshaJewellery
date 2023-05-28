import { color } from "@mui/system";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import HighJewellery from "./HighJewellery";
import Hoverpopper from "./Hoverpopper";

const Header = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [loginButton, setLoginButton] = useState(false);
  const history = useNavigate();

  const onHover = (e) => {
    console.log(e);
    e.target.classList.add("dark");
    setIsHovering(true);
  };
  const logout = () => {
    localStorage.removeItem("token");
    setLoginButton(true);
  };
  const onHoverOut = (e) => {
    // e.target.classList.toggle("fa-rotate-180");
    e.target.classList.remove("dark");
    setIsHovering(false);
  };
  useEffect(() => {
    const handlePageLoad = () => {
      // Call your function or perform desired action here
      console.log("Navigated to the particular page");
      if (localStorage.getItem("token") !== null) {
        setLoginButton(false);
      }
    };

    // Check if the current location matches the target page path
    if (window.location.pathname === "/") {
      handlePageLoad();
    }
  }, [history]);

  useEffect(() => {
    console.log(localStorage.getItem("token"));
    const handleStorageChange = () => {
      // Call your function or perform desired action here
      console.log("Local storage changed:", localStorage);
    };

    // Add event listener for 'storage' event
    window.addEventListener("storage", handleStorageChange);

    return () => {
      // Clean up the event listener on component unmount
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

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
            <div>Like</div>
            </Link>
          </div>
          <div className="header-button">
            <Link className="Link" aria-current="page" to="/search">
              <i
                class="fa-sharp fa-solid fa-magnifying-glass"
                onMouseOver={onHover}
                onMouseOut={onHoverOut}
              ></i>
            <div>Search</div>
            </Link>
          </div>
          <div className="header-button">
            <Link className="Link" aria-current="page" to="/userdetails">
              <i
                class="fa-solid fa-user"
                onMouseOver={onHover}
                onMouseOut={onHoverOut}
              ></i>
            <div>Profile</div>
            </Link>
          </div>
          <div className="header-button">
            <Link className="Link" aria-current="page" to="/mybag">
              <i
                class="fa-solid fa-bag-shopping"
                onMouseOver={onHover}
                onMouseOut={onHoverOut}
              ></i>
            <div>Bag</div>
            </Link>
          </div>
          {loginButton && (
            <div className="header-button">
              <Link className="Link" aria-current="page" to="/login">
                <i
                  class="fa-sharp fa-solid fa-right-to-bracket"
                  onMouseOver={onHover}
                  onMouseOut={onHoverOut}
                ></i>
              </Link>
            </div>
          )}
          <div>
            <button onClick={logout}>logout</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
