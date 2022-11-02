import { Component, useEffect, useState } from "react";
import axios from "../instance/axios";
import { useParams, useNavigate } from "react-router";
import { useRef } from "react";

const Addnewsection = () => {
  // const [addquestion, setaddquestion] = useState(1);
  const cat_id = useParams();
  const imgRef = useRef(null);
  const navigate = useNavigate();
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
    if(val.data){
      alert("Inserted sucessfully")
          }
    else{
      alert("something went problem")
    }
  };
  return (
    <>
      <h1>ADD NEW SECTION</h1>
      <ul class="list">
        <li class="lis" onClick={() => navigate(`view`)}>
          View questions
        </li>
        <li class="lis" onClick={() => navigate(`/admin/exams`)}>
          back
        </li>
      </ul>

      <input type="file" accept="image/*" ref={(r) => (imgRef.current = r)} />
      <br />
      <button
        className="btn"
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
      <br />
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
      <br />
      <button className="btn submitbtn" onClick={submitfun}>
        submit
      </button>
    </>
  );
};

export default Addnewsection;

export const Innerinput = ({ updateValue, index, value }) => {
  const answer = ["ans1", "ans2", "ans3", "ans4"];
  const [datavale, setdatavale] = useState(() => {
    if (value)
      return {
        ...updateValue[value.current],
        ans: eval(updateValue[value.current].ans),
      };
    return {};
  });
  // console.log(updateValue[value.current], "from another");
  // console.log(updateValue[value.current].Correctans);

  const datavalidation = async () => {
    console.log(datavale);
    if(datavale.description){
      const val=await axios.post("/updatequestion",{"datavale":datavale,"question":2})
    console.log(val);
    if(val.data){
      alert("have updated successfully")
      

    }else{
      alert("Something went wrong")
    }

    
    }
    else{
      const val=await axios.post("/updatequestion",{"datavale":datavale,"question":1})
    console.log(val);
    if(val.data){
      alert("have updated successfully")
      window.location.reload();
      

    }else{
      alert("Something went wrong")
    }

    }
    
    
  };

  // const updateValue = (val, field) => {
  //   setQus((p) => ({ ...p, [field]: val }));
  // };
  return (
    <>
      {value == 0 || value ? (
        <form style={{ position: "relative" }}>
          <br /> <br />
          {updateValue[value.current].description && (
            <textarea
              className="qus_text"
              type="text"
              placeholder="questions"
              style={{ fontFamily: "cursive" }}
              defaultValue={updateValue[value.current].description}
              // for my understanding I need to do linke this
              onChange={(e) =>
                setdatavale((p) => ({ ...p, description: e.target.value }))
              }
            ></textarea>
          )}
          <textarea
            className="qus_text"
            type="text"
            placeholder="questions"
            style={{ fontFamily: "cursive" }}
            defaultValue={
              updateValue[value.current].ques || updateValue[value.current].qus
            }
            // for my understanding I need to do linke this
            onChange={(e) =>
              setdatavale((p) => ({ ...p, question: e.target.value }))
            }
          ></textarea>
          <br />
          <input
            class="input_duration"
            type="text"
            placeholder="duration"
            name="correctAn"
            required
            style={{ color: "blue" }}
            // value={valuess["crtans"] === i}
            defaultValue={updateValue[value.current].time}
            onChange={(e) =>
              setdatavale((p) => ({ ...p, time: e.target.value }))
            }
          />
          <br />
          {Array.apply(null, Array(4)).map((q, i) => (
            <div key={i} className="qus_option">
              <input
                type="radio"
                name="correctAn"
                required
                defaultChecked={
                  (updateValue[value.current].Correctans ||
                    updateValue[value.current].c_ans) -
                    1 ==
                  i
                }
                // value={valuess["crtans"] === i}
                onChange={(e) =>
                  setdatavale((p) => ({
                    ...p,
                    [updateValue[value.current].Correctans
                      ? "Correctans"
                      : "c_ans"]: i + 1,
                  }))
                }
              />
              <input
                type="text"
                // value={valuess[answer[i]]}
                defaultValue={eval(updateValue[value.current].ans)[i]}
                onChange={(e) =>
                  setdatavale((p) => {
                    let newAns = [...p.ans];
                    console.log(newAns, e.target.value);
                    newAns[i] = e.target.value;
                    return {
                      ...p,
                      ans: newAns,
                    };
                  })
                }
              />
            </div>
          ))}
          <br />
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => datavalidation()}
          >
            Submit
          </button>
        </form>
      ) : (
        <form>
          <textarea
            className="qus_text"
            type="text"
            placeholder="description"
            onChange={(e) => updateValue(e.target.value, "descreption")}
          ></textarea>
          <br />
          <br />

          <textarea
            className="qus_text"
            type="text"
            placeholder="questions"
            onChange={(e) => updateValue(e.target.value, "question")}
          ></textarea>
          <br />
          <input
            class="input_duration"
            type="text"
            placeholder="duration"
            name="correctAn"
            required
            // value={valuess["crtans"] === i}
            onChange={(e) => updateValue(e.target.value, "time")}
          />
          <br />

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
      )}
    </>
  );
};
