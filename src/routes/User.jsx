import "./user.css";
import { useEffect, useRef, useState } from "react";
import {
  Link,
  Navigate,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import Header from "../components/Header";
import { QuestionTemplate } from "../components/exams/Question";
import axios from "../instance/axios";
import Instruction from "./Instruction";
import Showlevel from "./Showlevel";
import ChangePassword from "./ChangePassword";

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
        <Route path="changePassword" element={<ChangePassword />} />
        <Route path="instruction/:level" element={<Instruction />} />{" "}
        {/*list of exams */}
        <Route
          path="instruction/showlevel/:lev_id"
          element={<Showlevel />}
        />{" "}
        {/*list of catagory */}
        <Route path=":levelID" element={<WriteExam />} />
        <Route
          path="yourScore/:mark/:totalMark/:levelID"
          element={<YourScore />}
        />
        {/*answer page */}
        <Route path=":levelID/:catID" element={<WriteExam />} />{" "}
      </Routes>
    </div>
  );
};

const YourScore = () => {
  const { mark, totalMark, levelID } = useParams();
  const navigate = useNavigate();
  return (
    <div className="yourScore">
      <h1>
        You got {mark} out of {totalMark}
      </h1>
      <button
        type="button"
        className="btn"
        onClick={() => {
          navigate(`/User/${levelID}`);
        }}
      >
        Proceed
      </button>
    </div>
  );
};

const ExamList = ({}) => {
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  const [clevel, setClevel] = useState(null);
  console.log("clevel", clevel);
  const [scorecard, setscorecard] = useState([]);
  const fetch = async () => {
    const res = await axios.get("/showscore", {
      params: {
        email: email,
      },
    });
    console.log(res);
    let val = 1;
    if (res.status == 200) {
      if (res.data) val = res.data + val;
      else val = 0;
      setClevel(val);
      fechscore(val);
    } else {
      alert("something went wrong");
      // highscore();
    }
  };
  useEffect(() => {
    fetch();
  }, []);

  const fechscore = async (val) => {
    const scorecard = await axios.get("/levscore", {
      // show use'r colleque level
      params: {
        level: val,
      },
    });

    if (scorecard.data) {
      setscorecard(scorecard.data);
    } else {
      alert("Something wrong");
    }
  };

  const highscore = async () => {
    const score = await axios.get("/highscore");
    console.log(score);
    if (score) {
      setscorecard(score.data);
    } else {
      alert("Something wrong");
    }
  };
  console.log("This", scorecard);
  const level = ["1st score", "2nd score", "3rd score"];
  return (
    <>
      <h1>Scorecard</h1>
      <div className="exam-list">
        <div className="scoreboard">
          {scorecard.map((e) => (
            <>
              <h3>{e.name}</h3>
              <h3>{e.c_mark}</h3>
            </>
          ))}
        </div>
        <button
          className="btn"
          onClick={() => {
            if (clevel != null) navigate(`instruction/${clevel}`);
            else alert("something went wrong");
          }}
        >
          proceed
        </button>
      </div>
    </>
  );
};
export default User;

const WriteExam = () => {
  const navigate = useNavigate();
  const QTime = useRef();
  const timeOUTset = useRef(0);
  const timeIntervalset = useRef(0);
  const currentQuestionRef = useRef(0);
  const { levelID, catID } = useParams();
  const [level, setLevel] = useState([]); // user_level
  const [questions, setQuestions] = useState([]); // using map questions ans ans
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentCatagory, setCurrentCatagory] = useState(0); //c_cat of user
  const [questionTime, setQuestionTime] = useState(0);
  const fetch = async () => {
    const res = await axios.get("/shown", { params: { level: levelID } });
    const { data } = res;
    const cCat = await axios.get("/ccat", {
      params: { email: localStorage.getItem("email") },
    });
    console.log(cCat.data.c_cat);
    setCurrentCatagory(cCat.data.c_cat);
    console.log(data);
    setLevel(data);
    // fetchQuestion()
  };
  console.log("current Question", currentQuestion);

  const mytime = () => {
    // passing to next question when times up
    if (QTime.current.length > currentQuestionRef.current + 1) {
      currentQuestionRef.current += 1;
      setCurrentQuestion((p) => p + 1);
    } else {
      //  alert("Here have to do submit the form or do further action");
      return submit();
    }

    //assign the time for the current question
    setQuestionTime(QTime.current[currentQuestionRef.current].time);

    //to set the timeout of the current question
    timeOUTset.current = setTimeout(
      mytime,
      QTime.current[currentQuestionRef.current].time * 1000
    );

    //clean up the previous question time
    clearInterval(timeIntervalset.current);

    //to set current question time for timer in user screen
    timeIntervalset.current = setInterval(() => {
      setQuestionTime((p) => p - 1);
    }, 1000);
  };

  const fetchQuestion = async () => {
    const res = await axios.get(`/shown`, { params: { type: catID } });
    const { data } = res;
    // console.log(data, data.map(q => ({ id: q.id, qus: q.ques, options: eval(q.ans) })));
    console.log(data);
    setQuestions(
      data.map((q, i) => ({
        id: q.id,
        qus: q.ques,
        user_ans: -1,
        time: q.time,
        options: eval(q.ans),
      }))
    );
    //settimeout //use data q.time

    //for timer module
    //getting the time from the source
    QTime.current = data.map((q, i) => ({
      time: q.time, //1, //i === 1 || i === 0 ? 10 :
    }));

    // set the time out for the first question
    timeOUTset.current = setTimeout(
      mytime,
      QTime.current[currentQuestion].time * 1000
    );

    // set first questions total time
    setQuestionTime(QTime.current[currentQuestion].time);

    // clean up the timer interval for user display for first question
    clearInterval(timeIntervalset.current);

    // first question timer setting
    timeIntervalset.current = setInterval(() => {
      setQuestionTime((p) => p - 1);
    }, 1000);
    console.log(timeIntervalset);

    //
  };
  useEffect(() => {
    if (!catID) fetch();
    else fetchQuestion();
  }, [levelID, catID]);
  const submit = async (e) => {
    e?.preventDefault();
    console.log(questions);
    const { data } = await axios.post("/studreport", {
      type_id: catID,
      email: localStorage.getItem("email"),
      ans: questions.map((a) => eval(a.options)[a.user_ans]), //[{}]
    });
    // alert(`You got ${data}/${questions.length}`);
    navigate(`/User/yourScore/${data}/${questions.length}/${levelID}`);
  };
  const nextQuestion = () => {
    console.log(questions);
    if (questions[currentQuestion].user_ans < 0)
      return alert("Please select the answer");
    if (questions.length > currentQuestion) {
      // setCurrentQuestion((p) => p + 1);
      clearTimeout(timeOUTset.current);
      mytime();
      // // stoptime();
      // clearInterval(timeIntervalset.current);
    } else alert("You have done all the answers");
  };
  // console.log("question", questions);
  // console.log("currentQuestion", currentQuestion);

  return (
    <>
      {catID ? (
        <>
          <h1>Questions</h1>
          <form onSubmit={submit} className="answer_form">
            <h3>
              {currentQuestion + 1}/{questions.length}
            </h3>
            <h3>
              Time:{Math.floor(questionTime / 60)}:{questionTime % 60}
            </h3>
            {questions.length ? (
              <div className="individualQuestion">
                <QuestionTemplate
                  user
                  setQuestions={setQuestions}
                  num={currentQuestion + 1}
                  qus={questions[currentQuestion]} //user_ans=-1
                />

                {questions.length - 1 !== currentQuestion && (
                  <button
                    className="btn"
                    //
                    disabled={questions[currentQuestion].user_ans < 0}
                    // {/* do the  i know bro  then call me okey bro
                    type="button"
                    onClick={nextQuestion}
                  >
                    Next
                  </button>
                )}
              </div>
            ) : (
              <h3>No questions found</h3>
            )}
            {questions.length - 1 === currentQuestion && (
              <div className="controls">
                {/* <button type="reset">Reset</button> */}
                <button
                  type="submit"
                  disabled={questions[questions.length - 1].user_ans < 0}
                >
                  submit
                </button>
              </div>
            )}
          </form>
        </>
      ) : (
        <>
          <h1>Category</h1>
          <ul>
            {level.map((l, i) => (
              <li key={i}>
                <Link to={`${l.id}`}>
                  <button disabled={currentCatagory != i} className="btn">
                    {l.name}
                  </button>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};
