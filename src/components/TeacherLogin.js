import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./TeacherLogin.css";

function TeacherLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  const navigate = useNavigate();

  const login = () => {
    axios
      .post("http://localhost:3001/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        if (response.data.message) {
          setLoginStatus(response.data.message);
        } else {
          sessionStorage.setItem("name", response.data.name);
          sessionStorage.setItem("id", response.data.id);

          //TODO get teacher id from response
          navigate(
            "/TeacherLogin/Home"
          ); /*, {state: {teacher: response.data}}*/
          // console.log(response.data); setLoginStatus(`Welcome ` + response.data.name)
        }
      });
  };

  return (
    <div className="background">
      <h1 className="head">Login</h1>
      <div className="box">
        <input
          className="username"
          type="text"
          placeholder="Username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          className="password"
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button className="login" onClick={login}>
          Login
        </button>
        <Link to="Register">
          <h3 className="new">Not a User?</h3>
        </Link>
      </div>
      <br />
      <h1 className="error">{loginStatus}</h1>
    </div>
  );
}

export default TeacherLogin;
