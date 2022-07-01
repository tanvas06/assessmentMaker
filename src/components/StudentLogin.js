import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StudentLogin = () => {
  const [name, setName] = useState("");
  const [testKey, setTestKey] = useState("");
  const [keyStatus, setKeyStatus] = useState("");

  const navigate = useNavigate()

  const getTest = () => {
    axios.post("http://localhost:3001/StudentLogin", {
      testKey: testKey,
    }).then((response) => {
        console.log(response.data.id)
        if(response.data.message){
            setKeyStatus(response.data.message)
        } else {
        sessionStorage.setItem("TestId", response.data.id) 
        navigate('/StudentLogin/Test')
        }
    })
  };

  return (
    <div>
      <h1>GOOD LUCK!</h1>
      <div>
        <input
          type="text"
          placeholder="Test Key"
          onChange={(e) => {
            setTestKey(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <h1>{keyStatus}</h1>
        <button onClick={getTest}>Begin</button>
      </div>
    </div>
  );
};

export default StudentLogin;
