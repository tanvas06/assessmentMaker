import Main from './components/Main';
import { BrowserRouter ,Routes, Route } from "react-router-dom";
// import './App.css';
import TeacherLogin from './components/TeacherLogin';
import Register from './components/Register';
import Home from './components/Home';
import NewTest from './components/NewTest';
import StudentLogin from './components/StudentLogin';
import Test from './components/Test';


function App() {
  return (
    
<BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/>} /> 
        <Route path="StudentLogin" element={<StudentLogin/>} />
        <Route path="StudentLogin/Test" element={<Test />} />
        <Route path="TeacherLogin" element={<TeacherLogin/>} />
        <Route path='TeacherLogin/Register'  element={<Register />} />
        <Route path='TeacherLogin/Home'  element={<Home />} />
        <Route path='TeacherLogin/Home/newTest'  element={<NewTest />} />
      </Routes>
</BrowserRouter>
 
    // <div className="App">
    //   <h1>Are You...</h1>
    //   <Main />
    // </div>
  );
}

export default App;
