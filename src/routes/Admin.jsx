import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Exams from "../components/Exams";
import CreateExam from "../components/exams/CreateExam_and_type";
import Header from "../components/Header";
import "./admin.css";
import NavBar from "../components/NavBar";
import Question from "../components/exams/Question";

const Admin = () => {
  const navigate = useNavigate();
  useEffect(() => {
    //to check the user is loged in as admin
    const d = localStorage.getItem("logedin");
    if (d !== "admin") navigate("/");
  }, []);
  return (
    <div className="app">
      <Header />
      <div className="container">
        <NavBar />
        <div className="sub-container">
          <Routes>
            <Route path="exams" element={<Exams />} /> {/*list of exams */}
            <Route path="exams/:levelID" element={<Exams />} /> {/*list of catagories */}
            <Route path="exams/:levelID/:catID" element={<Exams />} /> {/*list of questions */}
            <Route path="createExam" element={<Create_Exam />} /> {/*to create new exams(level) */}
            <Route
              path="createExam/:levelID"
              element={
                <div className="center">
                  <CreateExam context="catagory" />
                </div>
              }
            /> {/* to create catagory */}
            <Route
              path="createExam/:levelID/:catID"
              element={
                <div className="center">
                  <Question />
                </div>
              }
            /> {/* to create questions*/}
            <Route
              path="trainerCreation"
              element={<h1>Create Trainer (in progress)</h1>}
            />
            <Route
              path="students"
              element={<h1>students list (in progress)</h1>}
            />
            <Route
              path="importStudent"
              element={<h1>Import students (in progress)</h1>}
            />
            <Route
              path="report"
              index
              element={<h1>Report (in progress)</h1>}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};
const Create_Exam = () => {
  return (
    <div className="center">
      <h1>Create Exam</h1>
      <CreateExam />
    </div>
  );
};
export default Admin;
