import "./exams.css";
import Table from "./Table";
import Question from "./exams/Question";
import axios from "../instance/axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

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
  };
  useEffect(() => {
    fetch();
  }, [levelID, catID]);
  const addQus = () => {
    navigate(`/admin/createExam/${levelID}/${(catID)}`);
  };
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
        {catID && (
          <button className="addques btn" onClick={addQus}>
            Add question
          </button>
        )}
      </h1>
      <div className="exams">
        <Table data={exams} />
      </div>
    </>
  );
};

export default Exams;
