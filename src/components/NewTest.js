import React, { useState, useEffect } from "react";
import axios from "axios";

const NewTest = () => {
  const [questions, setQuestions] = useState(0);
  const [answers, setAnswers] = useState(0);
  const [testName, setTestName] = useState("");
  const [testKey, setTestKey] = useState("");
  const [questionContent, setQuestionContent] = useState([]);
  const [answerContent, setAnswerContent] = useState([]);
  //   const [question, setQuestion] = useState("");
  //   const [answer, setanswer] = useState("");

  const teacherId = sessionStorage.getItem("id");
  // console.log(teacherId)

  const createTest = () => {
    console.log(questionContent, answerContent);
    axios.post(`http://localhost:3001/newTest`, {
      name: testName,
      key: testKey,
      questions: questionContent,
      // answers: questionContent.answers,
      // answerValue: questionContent.answers.is_correct,
      teacher_id: teacherId
    });
  };
 
  const addQuestion = () => {
    setAnswerContent([]);
    setQuestionContent([]);
    let newQuestions = [];
    for (let i = 0; i < questions; i++) {
      let answerArr = [];
      for (let j = 0; j < answers; j++) {
        answerArr.push({ text: "", is_correct: false, questionNumber: i });
      }
      newQuestions.push({
        text: "",
        answers: answerArr,
      });
      // setAnswerContent(answerArr);
      console.log(newQuestions);
    }
    setQuestionContent(newQuestions);
  };

  useEffect(() => {
    console.log(questionContent);
  }, [questionContent]);

  /*[{text:"", answers:[{text: "", is_correct: false}]}]*/
  // const makeQuestions = () => {
  //     for(let i = 0; i < +questions; i++){
  //         <input type='text' placeholder='Question Here' onChange={(e) => {setQuestionText(e.target.value)}}></input>
  //         for(let j = 0; j < +answers; j++){
  //           <input type='text' placeholder='Answer' value={false} onChange={(e) => {setAnswerText(e.target.value)}}></input>
  //         }
  //     }
  // }



  return (
    <div>
      <div className="start">
        <input
          type="number"
          placeholder="How Many Questions?"
          onChange={(e) => {
            setQuestions(e.target.value);
          }}
        ></input>
        <input
          type="number"
          placeholder="Answers Per Question?"
          onChange={(e) => {
            setAnswers(e.target.value);
          }}
        ></input>
        <input
          type="text"
          placeholder="Name of Assessment"
          onChange={(e) => {
            setTestName(e.target.value);
          }}
        ></input>
        <input
          type="text"
          placeholder="Test Key"
          onChange={(e) => {
            setTestKey(e.target.value);
          }}
        ></input>
        <button onClick={addQuestion}>Generate Test</button>
        <ul>
          {questionContent.map((question, questionIndex) => (
            <div key={questionIndex.toString() + ".div"}>
              <input
                type="text"
                placeholder="Question"
                value={question.text}
                key={questionIndex.toString() + ".question"}
                onChange={(e) => {
                  const questions = [...questionContent];
                  questions[questionIndex].text = e.target.value;
                  setQuestionContent(questions);
                }}
              ></input>
                {question.answers.map((answer, answerIndex) => 
                  <li key={questionIndex.toString() + ".questionLi" + answerIndex}>
                    <input
                      type="radio"
                      name={questionIndex.toString() + ".questionLi"}
                      // placeholder="answer"
                      // value={answer}
                      key={questionIndex.toString() + ".questionButton" + answerIndex}
                      onChange={()=>{answer.is_correct=true}}
                    ></input>
                    <input
                      type="text"
                      placeholder="answer"
                      value={answer.text}
                      key={questionIndex.toString() + ".questionInput" + answerIndex}
                      onChange={(e) => {
                        const questions = [...questionContent];
                        questions[questionIndex].answers[answerIndex].text = e.target.value
                        // answers[answerIndex].text = e.target.value;
                        setQuestionContent(questions);
                      }}
                    ></input>
                  </li>
                )}
              
            </div>
          ))}
        </ul>
        <button onClick={createTest}>Create</button>
      </div>
    </div>
  );
};

export default NewTest;
