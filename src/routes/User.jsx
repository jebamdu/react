import "./user.css";
import { useEffect, useRef, useState } from "react";
import {
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
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
import rank1 from "../assets/1.png";
import rank2 from "../assets/2.png";
import rank3 from "../assets/3.png";
import L_pop from "../assets/4.jpg";
import R_pop from "../assets/5.jpg";

import arrowRight from "../assets/arrow.svg";

const User = () => {
  const navigate = useNavigate();

  useEffect(() => {
    //to check the user is loged in as admin
    const d = localStorage.getItem("logedin");

    if (d !== "user") navigate("/");
  }, []);
  const [headervisibility, setHeadervisibility] = useState(true);
  return (
    <div className="app user-app">
      {headervisibility && <Header user />}
      <Routes>
        <Route index element={<ExamList />} /> {/*list of exams */}
        <Route path="changePassword" element={<ChangePassword />} />
        <Route path="innerLevel/:Name" element={<Showinnerlevel />} />{" "}
        <Route path="innerLevel/:Name/:levels" element={<Showinnerlevel />} />{" "}
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
        <Route
          path=":levelID/:catID"
          element={<WriteExam setHeadervisibility={setHeadervisibility} />}
        />{" "}
      </Routes>
    </div>
  );
};

const YourScore = () => {
  const email = localStorage.getItem("email");
  const { mark, totalMark, levelID } = useParams();
  const [Name, setName] = useState({ name: "" });
  const [percent, setpercent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
 
    Marksstatement();
  }, []);

  const Marksstatement = () => {

    if (mark > 0) {
      const value = (mark / totalMark) * 100;
      setpercent(value);
    } else {
      setpercent(0);
    }
  };

  

  return (
    <div className="yourScore" style={{ display: "flex" }}>
      {percent >= 0 && (
        <Innercontainer
          mark={mark}
          total={totalMark}
          percent={percent}
          name={Name.name}
          level={levelID }
        />
      )}
    </div>
  );
};

const ExamList = ({}) => {
  const navigate = useNavigate();

  const [clevel, setClevel] = useState(null); // send the name
  const [showName, setshowName] = useState([]);

  console.log("clevel", clevel);

  const [Name, setName] = useState({ name: "" });
  console.log("Name is", Name);
  const [scorecard, setscorecard] = useState([]);
  const [projname, setprojname] = useState("");
  const [category, setcategory] = useState([]);
  const [next, setnext] = useState(1);
  console.log("catagory", category);
  console.log(scorecard, "scorecard is");

  const fetch = async () => {
   const email=localStorage.getItem("email")
   setName(email)
    highscore();
    fetchname();
  };
  const fetchname = async () => {
    const name = await axios.get("/shown", {
      params: {
        level: null,
        type: null,
      },
    });
    console.log(name, "the catagory is visible");
    setshowName(name.data);
    setprojname(name.data?.[0]?.name);
  };
  useEffect(() => {
    const email=localStorage.getItem("email")
    navigate(`innerLevel/${email}`)
    // fetch();
  }, []);

  const highscore = async (val) => {
    console.log(val, "name is");
    const score = await axios.get("/highscore", { params: { value: val } });
    console.log(score);
    console.log(scorecard);
    if (score) {
      setscorecard(score.data.val);
      setcategory(score.data.id);
    } else {
      alert("Something wrong");
    }
    setprojname(showName.find((d) => d.id == val).name);
  };

  console.log("This", scorecard);

  const back = () => {
    console.log(next);
    if (
      next >= 2 &&
      scorecard.filter((v) => v.level == category[next - 1]).length > 0
    ) {
      setnext((p) => p - 1);
    }
  };
  // const [formapping, setFormapping] = useState([]);
  const nextlevel = () => {
    // newval=[22,41]0
    // console.log("scorecard", scorecard);
    // setFormapping(scorecard.filter((v) => v.level == category[next-1]));
    console.log("next", next);
    if (
      next < 3 &&
      scorecard.filter((v) => v.level == category[next]).length > 0
    ) {
      setnext((p) => p + 1);
    }
  };

  const formapping = scorecard.filter((v) => v.level == category[next - 1]);
  console.log("formapping", formapping);

  const proceed_fun=()=>{
    
    if (Name.name != "") navigate(`innerLevel/${Name.name}`);
    else alert("something went wrong");
  }

  return (
    <>
      <h1
        className="user_heading"
        style={{
          color: "rgb(255, 0, 187) ",
          fontSize: "8vh",
          fontFamily: "inherit",
        }}
      >
        LeaderBoard
      </h1>
      <div className="exam-list">
        <div className="scoreboard">
          <select
            className="listbox_leaderboard"
            onChange={(e) => {
              highscore(e.target.value);
            }}
          >
            {showName.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
          </select>
          <br />
          <h1
            className="levelNum"
            style={{
              textAlign: "center",
              fontFamily: "monospace",
              fontSize: "6vh",
            }}
          >
            {/* Level{next} */}
            {/* {showName?.[0]} */}
            {projname}-{formapping?.[0]?.level_name}
          </h1>

          <div style={{ textAlign: "center" }} className="rankwraper">
            <div className="rank1">
              <img src={rank1} alt="" />
              <h5 className="rankName">{formapping[0]?.name}</h5>
              <h5 style={{ fontFamily: "cursive" }}>
                {formapping[0]?.mark}/10- {formapping[0]?.batch_name}
              </h5>
            </div>
            <div className="innerwraper">
              <div className="rank2">
                <img src={rank2} alt="" />
                {formapping[1] && (
                  <span>
                    <h5 className="rankName">{formapping[1]?.name}</h5>
                    <h5 style={{ fontFamily: "cursive" }}>
                      {formapping[1]?.mark}/10 - {formapping[1]?.batch_name}
                    </h5>
                  </span>
                )}
              </div>
              <div className="rank3">
                <img src={rank3} alt="" />
                {formapping[2] && (
                  <span>
                    <h5 className="rankName">{formapping[2]?.name}</h5>
                    <h5 style={{ fontFamily: "cursive" }}>
                      {formapping[2]?.mark}/10 - {formapping[2]?.batch_name}
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
            onClick={nextlevel}
            alt=""
          />

          <img src={arrowRight} className="arrowLeft" onClick={back} alt="" />
          {/* <button onClick={nextlevel} >
            next
          </button> */}
        </div>
        <button
          className="btn user_proceedBTN"
          style={{ alignItems: "center", marginLeft: "8vh", maxWidth: "200vh" }}
          onClick={() => {
            proceed_fun()
          }}
        >
          proceed
        </button>
      </div>
    </>
  );
};
export default User;

const WriteExam = ({ setHeadervisibility }) => {
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

  useEffect(() => {
    const stream=localStorage.getItem("stream")
    console.log(stream,"this is stream");
    if (window.outerWidth < 600) setHeadervisibility(false);
    return () => setHeadervisibility(true);
  }, []);

  
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
    console.log(currentQuestionRef.current, "log this");
    // passing to next question when times up
    if (QTime.current.length > currentQuestionRef.current + 1) {
      currentQuestionRef.current += 1;
      setCurrentQuestion((p) => p + 1);
       const c_qus=JSON.parse(localStorage.getItem("c_qus"))
      localStorage.setItem("c_qus",JSON.stringify(c_qus+1))
      console.log(c_qus+1,"This is c_qus");
      const c_ref=JSON.parse(localStorage.getItem("c_ref"))
      localStorage.setItem("c_ref",JSON.stringify(c_ref))


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
    } else {
      //  alert("Here have to do submit the form or do further action");
      return submit();
    }
  };

  const fetchQuestion = async () => {
    const res = await axios.get(`/shownnew`, { params: { type: catID } });
   
    const qus_sets= JSON.parse(localStorage.getItem("questionset"))
    if(!qus_sets){
      
      
      let { data }=res;
    
    
      data=[...data[0],...data[1]]
      
    setQuestions(
      data.map((q, i) => ({
        id: q.id,
        qus: q.ques,
        user_ans: -1,
        time: q.time,
        options: eval(q.ans),
        image: q.image,
        describtion: q.describtion,
      }))
      
    );
    localStorage.setItem("questionset",JSON.stringify(data.map((q, i) => ({
      id: q.id,
      qus: q.ques,
      user_ans: -1,
      time: q.time,
      options: eval(q.ans),
      image: q.image,
      describtion: q.describtion,
    }))))
      localStorage.setItem("c_qus",0)
      localStorage.setItem("c_ref",0)
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
    }
    else{
      const qus_sets2= eval(JSON.parse(localStorage.getItem("questionset")))
      console.log(qus_sets2);
      
      
      const c_qus=JSON.parse(localStorage.getItem("c_qus"))
      const c_ref=JSON.parse(localStorage.getItem("c_ref"))
      setCurrentQuestion(c_qus)
      console.log(currentQuestion);
     
      
      
      //data=[...data[0],...data[1]]
      setQuestions(qus_sets2)
      QTime.current = qus_sets2.map((q, i) => ({
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
    }
   
    // console.log(data, data.map(q => ({ id: q.id, qus: q.ques, options: eval(q.ans) })));
    //console.log(data);
    
    //settimeout //use data q.time

    //for timer module
    //getting the time from the source
   

    //
  };

  const callupdateroute=async(data)=>{
    const insertdatacount=localStorage.getItem("insertdatacount")
    if(!insertdatacount){
      localStorage.setItem("insertdatacount",0)
    }
    const insertdatacont=localStorage.getItem("insertdatacount")  //In insertdatacount ___U have changed
    const val=await axios.post("/reupdatedata",{"data":data})
        if(val.data===false&&insertdatacont!==2){
          insertdatacount+=1;
          localStorage.setItem("insertdatacount",insertdatacount)

          callupdateroute(data)


        }
        else{
          localStorage.deleteItem("insertdatacount")

        }
  }
  useEffect(() => {
    if (!catID) fetch();
    else fetchQuestion();
  }, [levelID, catID]);
  const deltimes=()=>{
    localStorage.removeItem("times")
  }
  const submit = async (e) => {
    e?.preventDefault();
    
    const times=localStorage.getItem("times")
    
    
    clearTimeout(timeOUTset.current);
    clearInterval(timeIntervalset.current);
    console.log(questions);
    

    if(!times){
      localStorage.setItem("times",0)
      const myTimeout = setTimeout(deltimes, 20000)
      const { data } = await axios.post("/studreport", {
        type_id: catID,
        email: localStorage.getItem("email"),
        ans: questions.map((a) => eval(a.user_ans)),
        id: questions.map((a) => (a.id)), //[{}]
      });
      console.log(data[0]);
      if(data[0]['mark']){
        localStorage.removeItem("questionset")
        localStorage.removeItem("c_qus")
        localStorage.removeItem("c_ref")
  
      }
      if(data[1].result===false){
        console.log("log from false statement");
        callupdateroute({"email": localStorage.getItem("email"),"mark":data[0]['mark'],"type_id":data[4]['type'],"markarr":data[3]['markarr']})
      }
      // alert(`You got ${data}/${questions.length}`);
      navigate(`/User/yourScore/${data[0]['mark']}/${questions.length}/${levelID}`);
      
    }
   
  };
  const topRef=useRef(null)
 const scrolltop=()=>{
  // window.scrollTo({top:0,behavior:"smooth"})
topRef.current.scrollIntoView({block:"center",behaviour:"smooth"})
 }
  const nextQuestion = () => {
   scrolltop()
   const c_qus=JSON.parse(localStorage.getItem("c_qus"))
 
   localStorage.setItem("questionset",JSON.stringify(questions))

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
          <h1 ref={r=>topRef.current=r} style={{ marginLeft: "1rem", marginTop: "1rem" }}>Questions</h1>

          
          <form onSubmit={submit} className="answer_form">
            <h3 className="questionNumber">
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

const Innercontainer = (mark) => {
  const navigate = useNavigate();

  return (
    <div
      className="innercontainer_mark yourScore_last_page"
      style={{
        height: "300px",
        margin: "",
        width: "700px",
        backgroundColor: "rosybrown",
      }}
    >
      {mark.percent > 70 ? (
        <>
          <div className="img_container">
            <img
              src={L_pop}
              className="L_img"
              style={{ height: "150px", width: "150px" }}
              alt=""
            />
            <img
              src={L_pop}
              className="LB_img"
              style={{ height: "120px", width: "150px" }}
              alt=""
            />
            <img
              src={R_pop}
              className="R_img"
              style={{ height: "150px", width: "150px" }}
              alt=""
            />
            <img
              src={R_pop}
              className="RB_img"
              style={{ height: "120px", width: "150px" }}
              alt=""
            />
          </div>
          <div className="text_container">
            <h1>Congradulations !!!</h1>

            <h2>
              {" "}
              You got {mark.mark} out of {mark.total}{" "}
            </h2>
            <button
              type="button"
              className="btn"
              onClick={() => {
                const level_array1=JSON.parse(localStorage.getItem("levelarr"))
                level_array1.shift()
                console.log(level_array1,"This is new");
                localStorage.setItem("levelarr",JSON.stringify(level_array1))
                localStorage.removeItem("times")
                navigate(`/User/innerLevel/${"name"}/${mark.level}`);
              }}
            >
              Proceed
            </button>
          </div>
        </>
      ) : (
        <>
          {" "}
          
          <h1>
            {" "}
            You got only {mark.mark} out of {mark.total}
          </h1>
          <button
            type="button"
            className="btn"
            onClick={() => {
              const level_array1=JSON.parse(localStorage.getItem("levelarr"))
                level_array1.shift()
                console.log(level_array1,"This is new");
                localStorage.setItem("levelarr",JSON.stringify(level_array1))
                localStorage.removeItem("times")
              navigate(`/user/innerLevel/${mark.name||"name"}/${mark.level}`);
            
            //user/innerLevel/vmm/23
            }}
          >
            Proceed
          </button>
        </>
      )}
    </div>
  );
};
