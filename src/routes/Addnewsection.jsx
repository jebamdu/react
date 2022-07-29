import { Component, useEffect, useState } from "react";
import axios from "../instance/axios";
import { useParams,useNavigate } from "react-router";
import { useRef } from "react";

const Addnewsection = () => {
  // const [addquestion, setaddquestion] = useState(1);
  const cat_id = useParams();
  const imgRef = useRef(null);
  const navigate=useNavigate();
  const [questions, setQuestions] = useState([
    {
      descreption: "",
      question: "",
      ans1: "",
      ans2: "",
      ans3: "",
      ans4: "",
      time: "",
      crtans: "",
      time: "",
    },
  ]);
  const fileSelectedHandler = (event) => {
    // console.log(event.target.files[0]);
  };
  const submitfun = async (e) => {
    // const upload = async () => {
    const file = imgRef.current.files[0];
    if (!imgRef.current.value) {
      alert("Please select image");
      return;
    }
    const file_name = Date.now().toString() + "_" + file.name;
    console.log(file);

    // get upload url
    const { data } = await axios.get(
      "https://i6hl0hxqe1.execute-api.ap-south-1.amazonaws.com/",
      {
        params: {
          fileName: file_name,
          fileType: file.type,
        },
      }
    );
    //actual img upload
    await axios.put(data.url, file);

    const resImg =
      "https://yepquizbucket.s3.ap-south-1.amazonaws.com/" + file_name;
    console.log("accessURL", resImg);
    // setAccURL(au);

    // }
    // // console.log();
    // const imgForm = new FormData();
    // imgForm.append(
    //   "image",
    //   imgRef.current.files[0],
    //   imgRef.current.files[0].name
    // );

    // const resImg = await axios.post("http://localhost:8080/uploadImage", imgForm);
    // console.log(resImg);

    // console.log(questions);
    const val = await axios.post("/insert_ques_2", {
      questions,
      resImg,
      cat_id: cat_id.catID,
    });
    console.log(val);
  };
  return (
    <>
      <h1>ADD NEW SECTION</h1>
      <h3 onClick={()=>(navigate(`view`))}>View questions</h3>
      <h3 onClick={()=>(navigate(`/admin/exams`))}>back</h3>

      <input type="file" accept="image/*" ref={(r) => (imgRef.current = r)} />
      <button
        onClick={() =>
          setQuestions((P) => [
            ...P,
            {
              question: "",
              ans1: "",
              ans2: "",
              ans3: "",
              ans4: "",
              crtans: "",
              time: "",
            },
          ])
        }
      >
        add more
      </button>
      {questions.map((qus, i) => (
        // <div key={i}>
        <Innerinput
          key={i}
          updateValue={(val, field) =>
            setQuestions((p) =>
              p.map((v, index) => (i === index ? { ...v, [field]: val } : v))
            )
          }
        />
        // </div>
      ))}

      <button onClick={submitfun}>submit</button>
    </>
  );
};

export default Addnewsection;

const Innerinput = ({ updateValue, index }) => {
  const answer = ["ans1", "ans2", "ans3", "ans4"];

  // const updateValue = (val, field) => {
  //   setQus((p) => ({ ...p, [field]: val }));
  // };
  return (
    <>
      <form>
        <textarea
          className="qus_text"
          type="text"
          placeholder="description"
          onChange={(e) => updateValue(e.target.value, "descreption")}
        ></textarea>

        <textarea
          className="qus_text"
          type="text"
          onChange={(e) => updateValue(e.target.value, "question")}
        ></textarea>
        <input
          type="text"
          placeholder="duration"
          name="correctAn"
          required
          // value={valuess["crtans"] === i}
          onChange={(e) => updateValue(e.target.value, "time")}
        />

        {Array.apply(null, Array(4)).map((q, i) => (
          <div key={i} className="qus_option">
            <input
              type="radio"
              name="correctAn"
              required
              // value={valuess["crtans"] === i}
              onChange={(e) => updateValue(i, "crtans")}
            />
            <input
              type="text"
              // value={valuess[answer[i]]}
              onChange={(e) => updateValue(e.target.value, answer[i])}
            />
          </div>
        ))}
      </form>
    </>
  );
};
