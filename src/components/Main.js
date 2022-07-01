import React from 'react'
import { Link } from 'react-router-dom'
import './Main.css'

const Main = () => {
  return (
  
    <div className='background'>

        <h1 className='head'>Are You ... </h1>
      {/* 👇️ react router link */}
      <Link to="/StudentLogin">
        <button className='student'>A Student</button>
      </Link>

      <br />
      <br />

     <Link to="/TeacherLogin">
       <button className='teacher'>A Teacher</button>
     </Link>

     
    </div>

  )
}

export default Main