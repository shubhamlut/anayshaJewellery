import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Adminportal = () => {
  window.onload = function () {
    console.log("On Load Function Triggered");
  };
  const navigate = useNavigate();
  const handleOnClick = () => {
    localStorage.removeItem("token");
    navigate("/adminshubhamlutade");
  };

  useEffect(() => {
    onPageLoad();
    console.log("useeffect")
  }, []);

  
  const onPageLoad = async () => {
   
    console.log("In OnLoad Function")
    const response = await fetch(
      `http://localhost:5000/api/product/getallproducts`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();
    console.log(json);
  };

  return (
    <div>
      <div className="loginHeader">
        <h2>Admin Portal</h2>
      </div>
      <p>This is admin portal. Dashboard coming soon</p>
      <button onClick={handleOnClick}>Logout </button>
    </div>
  );
};

export default Adminportal;
