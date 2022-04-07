import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../instance/axios";
import './questions.css'

const Question = () => {
  const catid = useParams().catID
  const navigate = useNavigate()
  const [questions, setQuestions] = useState([]);

  const addele = async (e) => {
    e.preventDefault()

    const ans = []
    const qus = []
    const time = []
    const correctans = []
    for (const i in questions) {
      ans.push([questions[i].option1, questions[i].option2, questions[i].option3, questions[i].option4])
      qus.push(questions[i].qus)
      time.push(questions[i].time)
      correctans.push(questions[i].ans)
    }
    console.log("answer", ans);
    console.log("this is", catid)
    console.log("question", qus);
    console.log("correct ans", correctans);
    const values = await axios.post("/insqus", {
      type_id: catid,
      time: time,
      qus: qus,
      ans: ans,
      correctans: correctans
    })
    console.log(values);


  }



  const add = async (e) => {

    const val = await importCSV(e);

    setQuestions(val)
  }
  return (
    // <div className="container">
    <div className="containerBody">
      <div className="navHead">
        <h3>Upload Questions</h3>
      </div>
      <div className="wrapper">
        <div className="mainContainer">
          <form onSubmit={addele}>
            <input type="file"
              className="inputText w-90"
              accept="text/csv" onChange={add} ></input>
            <button type="submit" className="btn primary btn-text">Add</button>
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
          headContainer = l.split(",").map(h => h.trim());
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

