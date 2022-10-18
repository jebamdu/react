import { useEffect, useState } from "react";
import CSVReader from "react-csv-reader";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../instance/axios";
import "./questions.css";

const Question = () => {
  const catid = useParams().catID;
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);

  const addele = async (e) => {
    e.preventDefault();

    const ans = [];
    const qus = [];
    const time = [];
    const correctans = [];
    for (const i in questions) {
      ans.push([
        questions[i].option1,
        questions[i].option2,
        questions[i].option3,
        questions[i].option4,
      ]);
      
      console.log(questions[i].qus.length);
      console.log(questions[i].time.length);
      console.log(questions[i].ans.length)
      
      if(questions[i].qus.length>0){qus.push(questions[i].qus)}else{alert('Excel file format is wrong') ;return navigate("/admin/exams")};
      
      if(questions[i].time.length>0){time.push(questions[i].time)}else{alert('Excel file format is wrong');return navigate("/admin/exams")};
      
      if(questions[i].ans.length>0){correctans.push(questions[i].ans)}else{alert('Excel file format is wrong');return navigate("/admin/exams")};
    }
    console.log("answer", ans);
    
    console.log("this is", catid);
    console.log("question", qus);
    console.log("correct ans", correctans);
    const values = await axios.post("/insqus", {
      type_id: catid,
      time: time,
      qus: qus,
      ans: ans,
      correctans: correctans,
    });
    console.log(values);
    if (values.data) {
      alert("Questions are uploaded successfully");
      navigate("/admin/exams");
    } else alert("something went wrong");
  };

  const add = async (val) => {
    // const val = await importCSV(e);
    // console.log(e);
    setQuestions(val);
  };
  return (
    // <div className="container">
    <div className="containerBody">
      <div className="navHead">
        <h3>Upload Questions</h3>
      </div>
      <div className="wrapper">
        <div className="mainContainer">
          <form onSubmit={addele}>
            {/* <input
              type="file"
              className="inputText w-90"
              accept="text/csv"
              onChange={add}
            ></input> */}
            <CSVReader
              cssInputClass="inputText w-90"
              fileEncoding="ASCII"
              parserOptions={{ skipEmptyLines: true, header: true }}
              onFileLoaded={add}
            />
            <button type="submit" className="btn primary btn-text">
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Question;

function importCSV(e) {
  return new Promise((resolve, reject) => {
    let list = [];
    var fr = new FileReader();
    fr.onload = function () {
      // console.log(fr.result);
      let headContainer = [];

      fr.result.split("\n").forEach((l, i) => {
        if (i == 0) {
          headContainer = l.split(",").map((h) => h.trim());
          return;
        }
        let obj = {};
        let row = l.split(",");
        if (row.length === 1 && headContainer.length > 1) return;
        row.forEach((w, i) => {
          obj[headContainer[i]] = w.trim();
        });
        list.push(obj);
      });
      // console.log(list);
      // return list;
      resolve(list);
      // importPage(list)
    };
    try {
      fr.readAsText(e.target.files[0]);
    } catch (e) {
      console.error(e);
      reject("Can't read data from the file");
    }
    //   importFile.value = "";
  });
  // return promData
}

const QuestionTemplate = ({ num = "", qus = {}, setQuestions, user }) => {
  qus.qus = qus.qus.replace(/(?:\n\r|\n|\r)/g, "<br/>");
  let urlmatch = qus.qus.match(/(https?):\/\/(www\.)?[a-z0-9\.:].*?(?=\s)/gi);

  const updateValue = (val, field) => {
    console.log(val, field);
    return setQuestions((p) =>
      p.map((q) => {
        if (q.id === qus.id) {
          if (user) {
            q.user_ans = val;
            return q;
          }
          //only for admin
          if (typeof field === "number") {
            q.options[field] = val;
            return q;
          }
          q[field] = val;
          return q;
        }
        return q;
      })
    );
  };

  return (
    <div className="question">
      <label className="Questionno">Question {num}</label>

      {qus.image && (
        <div className="img">
          <img className="QusImage" src={qus.image} alt="Loading..." />
          <div style={{ position: "relative" }}>
          <div
              className=""
              style={{ width: "100%", height: "100%", position: "absolute" }}
            ></div>
          <h3
            dangerouslySetInnerHTML={{
              __html: qus.describtion.replace(/\n/g, "</br>"),
            }}
          >
            {}
          </h3>
          </div>
        </div>
      )}
      <div style={{ position: "relative" }}>
        {user ? (
          <>
            <div
              className=""
              style={{ width: "100%", height: "100%", position: "absolute" }}
            ></div>
            {/* <textarea
              className="qus_text"
              // type="text"
              // value={qus.qus}
              // disabled={user}
              // onChange={(e) => updateValue(e.target.value, "qus")}
            >{qus.qus}</textarea> */}
            <br />
            <div
              className="qus_text"
              // style={{ pointerEvents: "none" }}
              // type="text"
              // value={qus.qus}
              // disabled={user}
              // dangerouslySetInnerHTML={}
              dangerouslySetInnerHTML={{
                __html: urlmatch
                  ? urlmatch.reduce(
                      (preval, curval) =>
                        preval.replace(
                          curval,
                          `<a  target="_blank" href=${curval}>${curval}</a>`
                        ),
                      qus.qus
                    )
                  : qus.qus,
              }}
              // onChange={(e) => updateValue(e.target.value, "qus")}
            ></div>
          </>
        ) : (
          <>
            {/* <div className="hide123" style={{opacity: 1,width:"5rem",height:"5rem",background:"black"}}>
          </div> */}
            <br />
            <textarea
              className="qus_text"
              type="text"
              // value={qus.qus}
              disabled={user}
              onChange={(e) => updateValue(e.target.value, "qus")}
            >
              {qus.qus}
            </textarea>
          </>
        )}
      </div>

      {Array.apply(null, Array(4)).map((q, i) => (
        <div key={i} className="qus_option">
          <input
            type="radio"
            checked={(user ? qus.user_ans : qus.ans) === i}
            required
            onChange={(e) => updateValue(i, "ans")}
          />
          {/* {user ? ( */}
            <div
              style={{
                border: "2px solid rgba(118, 118, 118, 0.3)",
                paddingLeft: "0.5rem",
                backgroundColor: "rgba(239, 239, 239, 0.3)",
                color: "rgb(84, 84, 84)",
              }}
              className="bigScreenOption"
            >
              {qus.options[i]}
            </div>
          {/* ) : ( */}
            <input
              type="text"
              disabled={user}
              className="smallScreenOption"
              value={qus.options[i]}
              onChange={(e) => updateValue(e.target.value, i)}
            />
          {/* )} */}
        </div>
      ))}
    </div>
  );
};
export { QuestionTemplate };
