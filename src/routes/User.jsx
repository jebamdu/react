import "./user.css";
import { useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { QuestionTemplate } from "../components/exams/Question";
import axios from "../instance/axios";

const User = () => {
  const navigate = useNavigate();
  useEffect(() => {
    //to check the user is loged in as admin
    const d = localStorage.getItem("logedin");
    if (d !== "user") navigate("/");
  }, []);

  return (
    <div className="app">
      <Header user />
      <Routes>
        <Route index element={<ExamList />} /> {/*list of exams */}
        <Route path=":levelID" element={<WriteExam />} />{" "}
        {/*list of catagory */}
        <Route path=":levelID/:catID" element={<WriteExam />} />{" "}
        {/*answer page */}
      </Routes>
    </div>
  );
};

const ExamList = ({}) => {
  const [examList, setExamList] = useState([]);
  const fetch = async () => {
    const res = await axios.get("/shown");
    const { data } = res;
    console.log(data);
    setExamList(data);
  };
  useEffect(() => {
    fetch();
  }, []);
  return (
    <>
      <h1>Exams</h1>
      <div className="exam-list">
        {examList.map((e, i) => (
          <div key={i}>
            {" "}
            <Link to={`${e.id}`}>
              level {e.id} duration - {e.time}{" "}
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

const WriteExam = () => {
  const { levelID, catID } = useParams();
  const [level, setLevel] = useState([]);
  const [questions, setQuestions] = useState([]);
  const fetch = async () => {
    const res = await axios.get("/shown", { params: { level: levelID } });
    const { data } = res;
    console.log(data);
    setLevel(data);
    // fetchQuestion()
  };

  const fetchQuestion = async (cl) => {
    const res = await axios.get(`/shown`, { params: { type: catID } });
    const { data } = res;
    // console.log(data, data.map(q => ({ id: q.id, qus: q.ques, options: eval(q.ans) })));
    setQuestions(
      data.map((q) => ({ id: q.id, qus: q.ques, options: eval(q.ans) }))
    );
  };
  useEffect(() => {
    if (!catID) fetch();
    else fetchQuestion();
  }, [levelID, catID]);
  const submit = async (e) => {
    e.preventDefault();
    console.log(questions);
    const { data } = await axios.post("/studreport", {
      type_id: catID,
      ans: questions.map((a) => eval(a.options)[a.user_ans]),
    });
    alert(`You got ${data}/${questions.length}`);
  };
  return (
    <>
      {catID ? (
        <>
          <h1>Questions</h1>
          <form onSubmit={submit} className="answer_form">
            {questions.length ? (
              questions.map((q, i) => (
                <QuestionTemplate
                  user
                  setQuestions={setQuestions}
                  num={i + 1}
                  key={q.id}
                  qus={q}
                />
              ))
            ) : (
              <h3>No questions found</h3>
            )}
            <div className="controls">
              <button type="reset">Reset</button>
              <button type="submit">submit</button>
            </div>
          </form>
        </>
      ) : (
        <>
          <h1>Types</h1>
          <ul>
            {level.map((l, i) => (
              <li key={i}>
                <Link to={`${l.id}`}>{l.name}</Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default User;
