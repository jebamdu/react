import "./exams.css";
import Table from "./Table";
import Question from "./exams/Question";
import axios from "../instance/axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import addBtn from "../assets/addBtn.svg";

const Exams = () => {
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();
  const { levelID, catID } = useParams();
  console.log(levelID, catID);
  const fetch = async () => {
    const { data } = await axios.get("/shown", {
      params: {
        level: levelID,
        type: catID,
      },
    });
    setExams(data);
    console.log(data);
  };
  useEffect(() => {
     if (catID) addQus();
    fetch();
  }, [levelID, catID]);
  const addQus = async() => {

    //navigate(`/admin/createExam/${levelID}/${catID}`);
    
  };
  const [showpopup, setshowpopup] = useState(false);
  const [popData, setpopData] = useState("");

  const inserting = async () => {
    const val = await axios.post("/insert", {
      name: popData,
      id: levelID,
      time: null,
    });
    console.log(val);
  };

  const popupSubmit = (e) => {
    e.preventDefault();
    show();
    console.log(popData);
    inserting();
  };

  const show = () => {
    setshowpopup((p) => !p);
  };
  const addelement=()=>{
    navigate(`/admin/createExam/${levelID}/${catID}`);  
  }

  return (
    <>
      <h1 className="heading">
        {" "}
        {/*FRAGMENT*/}
        <Link to="/admin/exams">Exams</Link>
        {levelID && (
          <>
            {" > "}
            <Link to={`/admin/exams/${levelID}`}>level</Link>
          </>
        )}
        {catID && (
          <>
            {" > "}
            <Link to={`/admin/exams/${levelID}/${catID}`}>Type</Link>
          </>
        )}
      </h1>
      <div className="maincontainer">
        {showpopup && (
          <Popup
            data={popData}
            setdata={setpopData}
            submit={popupSubmit}
            hide={show}
          />
        )}
        {catID ? (<button onClick={addelement}>Add more</button>):
        (<img className="addBtn" onClick={show} src={addBtn} alt="add button" />)}
        <div className="exams">
          {catID ? (
            <Table data={exams} />
          ) : (
            exams.map((l, i) => (
              <Link key={i} to={String(l.id)}>
                <button className="btn primary">{l.name}</button>
              </Link>
            ))
          )}
        </div>
      </div>
    </>
  );
};

const Popup = ({ hide: hidecall, submit, setdata, data }) => {
  const hide = (e) => {
    if (e.currentTarget === e.target) hidecall(e);
  };

  return (
    <div className="popContainer" onClick={hide}>
      <div className="popup center column">
        <form onSubmit={submit}>
          <div className="inputContainer">
            <label>Name : </label>
            <input
              value={data}
              onChange={(e) => setdata(e.target.value)}
              type="text"
            />
          </div>
          <button type="submit" className="btn primary popupbtn">
            OK
          </button>
        </form>
      </div>
    </div>
  );
};

export default Exams;
