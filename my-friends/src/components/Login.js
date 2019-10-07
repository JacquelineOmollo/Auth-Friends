import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const Login = ({ history }) => {
  const [user, setPass] = useState({ username: "", password: "" });

  const handleChange = event => {
    setPass({ ...user, [event.target.name]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    axiosWithAuth()
      .post("/api/login", user)
      .then(response => {
        console.log(response);
        localStorage.setItem("token", response.data.payload);
        history.push("/api/friends");
      })
      .catch(error => console.log(error.response));
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        onchange={handleChange}
        placeholder="username"
        value={user.username}
      />

      <input
        type="password"
        name="password"
        onchange={handleChange}
        placeholder="password"
        value={user.password}
      />
      <button type="submit">Sign In</button>
    </form>
  );
};
export default Login;
