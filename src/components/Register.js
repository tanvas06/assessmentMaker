import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [nameReg, setNameReg] = useState("");
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  const SubmitRegister = () => {
    axios.post("http://localhost:3001/register",{
        name: nameReg,
        username:usernameReg,
        password:passwordReg,
    }).then((response)=>{
        console.log(response)
    })
  }


  return (
    <div>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="Name"
        onChange={(e) => {
          setNameReg(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => {
          setUsernameReg(e.target.value);
        }}
      />
      <input
        type="password"
        placeholder="password"
        onChange={(e) => {
          setPasswordReg(e.target.value);
        }}
      />
      {/* <input type="password" placeholder="re-enter password" /> */}
      <br />
      <button onClick={SubmitRegister}>Register</button>
    </div>
  );
};

export default Register;
