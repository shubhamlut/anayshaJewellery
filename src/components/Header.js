import { color } from "@mui/system";
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import HighJewellery from "./HighJewellery";
import Hoverpopper from "./Hoverpopper";
import Dropdown from "./Dropdown";

const Header = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [loginButton, setLoginButton] = useState(true);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const popUpRef = useRef();
  const history = useNavigate();

  const onHover = (e) => {
    e.target.classList.add("dark");
    setIsHovering(true);
  };

  const onHoverOut = (e) => {
    // e.target.classList.toggle("fa-rotate-180");
    e.target.classList.remove("dark");
    setIsHovering(false);
  };

  const onClick = (e) => {
    if (e.target.outerText === "Profile") {
      setShowProfileDropdown(!showProfileDropdown);
    }
  };

  const logout = () => {
    console.log("logout executed");
    localStorage.removeItem("token");
    setLoginButton(true);
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

    const handleClickOutside = (event) => {
      if (popUpRef.current && !popUpRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
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
        <div>
          <input
            className="header-item searchBar"
            placeholder="Search here"
            type="text"
          />
          <i class="fa-solid fa-magnifying-glass"></i>
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
          <div ref={popUpRef}>
            <div className="header-button">
              <Link
                className="Link"
                aria-current="page"
                onMouseOver={onHover}
                onMouseOut={onHoverOut}
                name="Profile"
                onClick={onClick}
              >
                <i class="fa-solid fa-user"></i>
                <div>Profile</div>
              </Link>

              {showProfileDropdown && (
                <div>
                  <ul className="profile-dropdown">
                    <Dropdown
                      text="My Profile"
                      icon="fa-sharp fa-regular fa-user"
                      navigateLink="/userdetails"
                    />
                    <Dropdown
                      text="Logout"
                      icon="fa-solid fa-arrow-left"
                      execute={logout}
                    />
                    <Dropdown
                      text="Help"
                      icon="fa-regular fa-circle-question"
                      navigateLink="/userdetails"
                    />
                  </ul>
                </div>
              )}
            </div>
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
                  class="fa-solid fa-arrow-right-from-bracket"
                  onMouseOver={onHover}
                  onMouseOut={onHoverOut}
                ></i>
                <div>Login</div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
