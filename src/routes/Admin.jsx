import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Exams from "../components/Exams";
import CreateExam from "../components/exams/CreateExam_and_type";
import Header from "../components/Header";
import "./admin.css";
import NavBar from "../components/NavBar";
import Question from "../components/exams/Question";
import Trainer from "../components/exams/Trainer";
import Student, { Studentupdate } from "./Student";
import Import from "./Import";
import ShowLevels from "../components/exams/ShowLevels";
import Report from "./Report";
import axios from "../instance/axios";
import Notification from "./Notification";

const Admin = () => {
  const navigate = useNavigate();
  const [notify, setnotify] = useState(null);

  const notification_fun = async () => {
    const notification = await axios.get("/ended_batch");
    console.log(notification, "notification");
    if (notification.data != "none") {
      setnotify(notification.data);
    }
  };
  
  useEffect(() => {
    //to check the user is loged in as admin
    const d = localStorage.getItem("logedin");
    if (d !== "admin") navigate("/");
    notification_fun();
  }, []);

  return (
    <div className="app">
      <Header />
      <div className="container">
        <>
          {notify !== null ? (
            <NavBar notification={notify} />
          ) : (
            <NavBar notification={0} />
          )}
        </>

        <div className="sub-container">
          <Routes>
            {/* <Route path="exams" element={<Exams />} /> list of exams */}
            <Route path="exams" element={<ShowLevels />} /> {/*list of exams*/}
            <Route path="exams/:levelID" element={<Exams />} />{" "}
            {/*list of catagories */}
            <Route path="exams/:levelID/:catID" element={<Exams />} />{" "}
            {/*list of questions */}
            <Route path="createExam" element={<Create_Exam />} />{" "}
            {/*to create new exams(level) */}
            <Route path="notification" element={<Notification values={notify}/>} />
            <Route path="notification/:id" element={<Notification />} />
            <Route
              path="createExam/:levelID"
              element={
                <div className="center">
                  <CreateExam context="catagory" />
                </div>
              }
            />{" "}
            {/* to create catagory */}
            <Route
              path="createExam/:levelID/:catID"
              element={
                // <div className="center">
                <Question />
                // </div>
              }
            />{" "}
            {/* to create questions*/}
            <Route path="trainerCreation/*" element={<Trainer />} />
            {/* <Route path="trainerCreation/:Updateshow" element={<Trainer />} /> */}
            <Route path="students" element={<Student />} />
            <Route path="students/:ID" element={<Studentupdate />}></Route>{" "}
            <Route path="importStudent" element={<Import />} />
            <Route path="report" element={<Report />} />
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
