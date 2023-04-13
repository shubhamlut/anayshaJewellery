import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Globalloginpage = () => {
  const [credentials, setCrendentials] = useState({ email: "", password: "" });
  const onChange = (e) => {
    setCrendentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const onSubmitHandle = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.status == "Successful") {
      //Save the token and redirect to home page
      localStorage.setItem("token", json.jwtToken);
      navigate("/adminportal");
    } else {
      alert("Invalid Creadtials", "danger");
    }
  };

  return (
    <div>
      <div className="loginHeader">
        <h2>Admin Login</h2>
      </div>
      <form onSubmit={onSubmitHandle} className="loginForm">
        <label for="email">Email Address</label>
        <input
          type="email"
          className="loginemail"
          id="email"
          name="email"
          value={credentials.email}
          onChange={onChange}
        />
        <label for="password">Password</label>
        <input
          type="password"
          className="loginpassword"
          id="password"
          name="password"
          value={credentials.password}
          onChange={onChange}
        />
        <input type="submit" className="loginButton" value="Login" />
      </form>
    </div>
  );
};

export default Globalloginpage;
