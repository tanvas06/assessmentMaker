import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = (props) => {
  //     const GetTests = () => {
  //     // axios.get(`http://localhost:3001/tests/:${id}`); //   /teachers/:id/tests
  //   };

  const navigate = useNavigate();

  //   const [teacher, setTeacher] = useState(props.location.state.teacher);
  const [tests, setTests] = useState([]);
  const [id, setId] = useState(sessionStorage.getItem("id"));

  useEffect(() => {
    //TODO error handling
    axios.get(`http://localhost:3001/teachers/${id}/tests`).then((res) => {
      setTests(res.data);
    });
  }, [id]);

  return (
    <div>
      <div className="tests">
        <ul>
          {tests.map((test) => (
            <li key={test.id}>{test.name}</li>
          ))}
        </ul>
      </div>
      <button
        onClick={() => {
          navigate("/TeacherLogin/Home/newTest");
        }}
      >
        New Test
      </button>
      <button>Edit Test</button>
    </div>
  );
};

export default Home;
