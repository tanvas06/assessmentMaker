const express = require("express");
const cors = require("cors");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "postgres://kxobpyontftxzw:3e8568634ae7f5564c2e3b6e7c8a4013a37f70c142bb194433b15278412c95fd@ec2-54-165-178-178.compute-1.amazonaws.com:5432/da4djsrejq9pks",
  {
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  }
);

const app = express();

app.use(express.json());
app.use(cors());

// app.get('/test', (req,res)=>{
//     res.send('crackker')
// })

app.post("/register", (req, res) => {
  const name = req.body.name;
  const username = req.body.username;
  const password = req.body.password;

  sequelize.query({
    query: "INSERT INTO teachers (name, username, password) VALUES (?, ?, ?) ",
    values: [name, username, password],
  });
});

app.post("/StudentLogin", (req, res) => {
  const key = req.body.testKey;

  sequelize
    .query({
      query: "SELECT * FROM tests WHERE key = ?",
      values: [key],
    })
    .then((result) => {
      console.log(result[0][0]);
      if (result[0].length === 1) {
        res.status(200).send(result[0][0]);
      } else {
        console.log("nothing");
        res.send({ message: "Key Does Not Exist" });
      }
    });
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  sequelize
    .query({
      query: "SELECT * FROM teachers WHERE username = ? AND password = ?",
      values: [username, password],
    })
    .then((result) => {
      console.log(result[0]);
      if (result[0].length === 1) {
        res.send(result[0][0]);
      } else {
        console.log("nothing");
        res.send({ message: "Wrong Username or Password" });
      }
    });
});

app.post(`/newTest`, async (req, res) => {
  // console.log(req.body)
  const name = req.body.name;
  const key = req.body.key;
  const teacher_id = req.body.teacher_id;
  const questions = req.body.questions;
  //   const answers = req.body.questions.answers.text;
  //   const answerValue = req.body.questions.answers.is_correct;

  const result = await sequelize.query({
    query: `INSERT INTO tests (name, teacher_id, key) VALUES (?, ?, ?) RETURNING id`,
    values: [name, teacher_id, key],
  });
  const testId = result[0][0].id;

  // const test =await sequelize.query({
  //   query: `SELECT id FROM tests WHERE teacher_id = ${teacher_id}`,
  // })

  // console.log("test id is " + test.id)

  for (let i = 0; i < questions.length; i++) {
    const qId = await sequelize.query({
      query:
        "INSERT INTO questions (question_text, test_id) VALUES (?, ?) RETURNING id",
      values: [questions[i].text, testId],
    });

    const questionId = qId[0][0].id;
    //   const questionId = sequelize.query({
    //     query: `SELECT id FROM questions WHERE test_id = ?`, values:[i+1]
    //   });

    console.log(questions[i]);

    for (let j = 0; j < questions[i].answers.length; j++) {
      await sequelize.query({
        query:
          "INSERT INTO answers (answer_text, question_id, is_correct) VALUES (?,?,?)",
        values: [
          questions[i].answers[j].text,
          questionId,
          questions[i].answers[j].is_correct,
        ],
      });
    }
  }
});

app.get("/teachers/:id/tests", (req, res) => {
  const id = req.params.id;

  sequelize
    .query({
      query: "SELECT * FROM tests WHERE teacher_id = ?",
      values: [id],
    })
    .then((result) => {
      res.send(result[0]);
    });
});

app.get("/test/:id", async (req, res) => {
  const id = req.params.id;

  const questions = await sequelize
    .query({
      query: "SELECT * FROM questions WHERE test_id = ?",
      values: [id],
    })
    // console.log("id's are " + questions);

    // for(let i = 0; i < .length; i++){
    //         sequelize.query({
    //                 query:""
    //             })
    //         }

    .then((result) => {
      console.log(result[0])
        res.send(result[0]);
    });
});

app.listen(3001, () => {
  console.log("server is running");
});
