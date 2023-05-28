import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../stylesheets/UserDetails.css";
const Userdetails = () => {
  const [credentials, setCrendentials] = useState({ email: "", password: "" });
  const onChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };


  const [userDetails,setUserDetails] = useState({name:"",email:"",address:""})
  const [disabledForm,setDisabledForm] = useState(true)
  const  enableForm =()=>{
    setDisabledForm(false)
  }

  const savechanges = async()=>{
    
  }
  const onSubmitHandle = async (e) => {
    e.preventDefault();
    
  };

  const getUserDetails = async () => {
   
    const response = await fetch(
      `http://localhost:5000/api/auth/getuserdetails`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    const json = await response.json();
    console.log(json);
    setUserDetails({name:json.name,email:json.email,address:json.shippingAddress})
    console.log(userDetails)
  };

  const location = useLocation();
  useEffect(() => {
    const handlePageLoad = () => {
      // Call your function or perform desired action here
      console.log("Navigated to the userDetails page");
      getUserDetails();
    };

    // Check if the current location matches the target page path
    if (location.pathname === "/userdetails") {
      handlePageLoad();
    }
  }, [location]);

  return (
    <div className="userDetails-Container"> 
      <form onSubmit={onSubmitHandle} className="userDetails">
        <label for="email">Name</label>
        <input
          type="text"
          className="username userEnteredDetails"
          id="name"
          name="name"
          value={userDetails.name}
          onChange={onChange}
          disabled={disabledForm}
        />
        <label for="email">Email Address</label>
        <input
          type="email"
          className="useremail userEnteredDetails"
          id="email"
          name="email"
          value={userDetails.email}
          onChange={onChange}
          disabled={disabledForm}
        />
        <label for="password">Shipping Address</label>
        <input
          type="text"
          className="userAddress userEnteredDetails"
          id="address"
          name="address"
          disabled={disabledForm}
          value={userDetails.address}
          onChange={onChange}
        />
        <div className="userDetailsActionButtons">
        <input type="submit" className="updateButton" onClick={enableForm} value="Update Details" />
        <input type="submit" className="saveChangesButton" onClick={savechanges} value="Save Changes" />
        </div>
      </form>
    </div>
  );
};

export default Userdetails;
