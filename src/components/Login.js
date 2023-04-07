import React from "react";

const Login = () => {
  const onHover = (e) => {
    console.log(e);
    e.target.classList.add("dark");
   
  };

  const onHoverOut = (e) => {
    // e.target.classList.toggle("fa-rotate-180");
    e.target.classList.remove("dark");
   
  };

  return (
    <>
      <div className="loginHeader">
        <h2>Login Customer</h2>
      </div>
      <form action="" className="loginForm">
        <label for="email">Email Address</label>
        <input type="email" className="loginemail" id="email" name="email" />
        <label for="password">Password</label>
        <input type="password" className="loginpassword" id="password" name="password" />
        <input type="submit" className="loginButton" value="Login" onMouseEnter={onHover} onMouseOut={onHoverOut} />
      </form>
    </>
  );
};

export default Login;
