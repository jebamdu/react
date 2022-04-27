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
import Showinnerlevel from "./Showinnerlevel";
import rank1 from "../assets/1.jpg";
import rank2 from "../assets/2.jpg";
import rank3 from "../assets/3.jpg";
import arrowRight from "../assets/arrow.svg";

const User = () => {
  const navigate = useNavigate();

  useEffect(() => {
    //to check the user is loged in as admin
    const d = localStorage.getItem("logedin");

    if (d !== "user") navigate("/");
  }, []);

  return (
    <div className="app user-app">
      <Header user />
      <Routes>
        <Route index element={<ExamList />} /> {/*list of exams */}
        <Route path="changePassword" element={<ChangePassword />} />
        <Route path="innerLevel/:Name" element={<Showinnerlevel />} />{" "}
        <Route path="instruction/:level/:type" element={<Instruction />} />{" "}
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
  const email = localStorage.getItem("email");
  const { mark, totalMark, levelID } = useParams();
  const [Name, setName] = useState({ name: "" });
  const navigate = useNavigate();

  useEffect(() => {
    fetchname();
  }, []);

  const fetchname = async () => {
    const name = await axios.get("/showscore", {
      params: {
        email: email,
      },
    });
    console.log(name);
    setName(name.data);
  };

  return (
    <div className="yourScore">
      <h1>
        You got {mark} out of {totalMark}
      </h1>
      <button
        type="button"
        className="btn"
        onClick={() => {
          navigate(`/User/innerLevel/${Name}`);
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
  const [clevel, setClevel] = useState(null); // send the name
  console.log("clevel", clevel);

  const [Name, setName] = useState({ name: "" });
  console.log("Name is", Name);
  const [scorecard, setscorecard] = useState([]);
  const [next, setnext] = useState(1);

  const fetch = async () => {
    const res = await axios.get("/showscore");
    console.log(res);

    if (res.status == 200) {
      if (res.data) {
        setName(res.data);
      }
    } else {
      alert("something went wrong");
      // highscore();
    }
    highscore();
  };
  useEffect(() => {
    fetch();
  }, []);

  const highscore = async () => {
    const score = await axios.get("/highscore");
    console.log(score);
    console.log(scorecard);
    if (score) {
      setscorecard(score.data);
    } else {
      alert("Something wrong");
    }
  };
  console.log("This", scorecard);

  const nextlevel = () => {
    setnext(next + 1);
  };
  console.log("scorecard", scorecard);
  const formapping = scorecard.filter((v) => v.level == next);
  return (
    <>
      <h1 style={{ color: "rgb(255, 0, 187) " }}>LeaderBoard</h1>
      <div className="exam-list">
        <div className="scoreboard">
          <h1 className="levelNum" style={{ textAlign: "center" }}>
            Level{next}
          </h1>
          <div style={{ textAlign: "center" }} className="rankwraper">
            <div className="rank1">
              <img src={rank1} alt="" />
              <h5 className="rankName">{formapping[0]?.name}</h5>
              <h5>
                {formapping[0]?.mark}/30 - {formapping[0]?.batch_name}
              </h5>
            </div>
            <div className="innerwraper">
              <div className="rank2">
                <img src={rank2} alt="" />
                {formapping[1] && (
                  <span>
                    <h5 className="rankName">{formapping[1]?.name}</h5>
                    <h5>
                      {formapping[1]?.mark}/30 - {formapping[1]?.batch_name}
                    </h5>
                  </span>
                )}
              </div>
              <div className="rank3">
                <img src={rank3} alt="" />
                {formapping[2] && (
                  <span>
                    <h5 className="rankName">{formapping[2]?.name}</h5>
                    <h5>
                      {formapping[2]?.mark}/30 - {formapping[2]?.batch_name}
                    </h5>
                  </span>
                )}
              </div>
            </div>
          </div>
          {/* <div className={`rank${i + 1}`}>
            {/* <img src={rank1} alt={`Rank${i + 1}`} /> 
          </div> */}

          <img
            src={arrowRight}
            className="arrowRight"
            onClick={next < 3 && nextlevel}
            alt=""
          />
          {/* <button onClick={nextlevel} >
            next
          </button> */}
        </div>
        <button
          className="btn"
          onClick={() => {
            if (Name != "") navigate(`innerLevel/${Name}`);
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

  console.log("levelId isss", levelID);
  console.log("catId isss", catID);

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
      ans: questions.map((a) => eval(a.user_ans)),
      id: questions.map((a) => eval(a.id)), //[{}]
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
            <h3 className="Timemodule">
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
          <ul className="catagory-list">
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
