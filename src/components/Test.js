import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Test = (props) => {

    const [test, SetTest] = useState([])
    const [answers, SetAnswers] = useState([])
    const testId = sessionStorage.getItem("TestId")


    useEffect(()=>{
        axios.get(`http://localhost:3001/test/${testId}`).then((res)=>{
            // console.log(res.data)
            SetTest(res.data)
        })
    }, [testId])
    
    console.log(test.id)

  return (
    <div>
        <h1>Welcome {props.name} and Good Luck!</h1>
        <div>
            {test.map((test)=>(
                <ul key={test.id}>{test.question_text}</ul>

            ))}
        </div>
    </div>
  )
}

export default Test