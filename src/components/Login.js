import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = function () {
  return (
    <div>
      <h2>Login</h2>
      <form>
        <label>
          E-mail: <input type="email" />
        </label>
        <label>
          Password: <input type="text" />
        </label>
        <input type="submit" value="Sign in" />
      </form>
      <h3>Don't have an account?</h3>
      <Link to="/signup">Sign Up</Link>
    </div>
  );
};

export default Login;
