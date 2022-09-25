import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import axios from "../instance/admin";

const Viewnewsection=()=>{

const cat_id=useParams()
const [questions, setquestions] = useState([]);
const navigate=useNavigate()

const callQuestion=async()=>{
console.log(cat_id.catID);
const val= await axios.get("/callNewSection",{params:{id:cat_id.catID}})
console.log(val);
setquestions(val.data)
}

useEffect(() => {
    callQuestion()   
}, []);
return(
    <>
    <button onClick={()=>(navigate(`/admin/createExam/${cat_id.catID}/newtype`))}>back</button>
    <div className="content">
              {questions.map(
                (d, i) => (
                  // <Link to={String(d.id)}>
                  <div key={i} className="btn primary flex-row jc-sb">
                    <div className="flex-column">
                      <div className=" fs-20 card-title">Question</div>
                      <div className="fs-20">{d.qus}</div>
                    </div>
                    {eval(d.ans)?.map((option, i) => (
                      <div className="flex-column" key={i}>
                        <div className=" fs-20 card-title">Option {i + 1}</div>
                        <div
                          className="fs-20"
                          style={
                            i === d.c_ans - 1
                              ? { backgroundColor: "#e342428c" }
                              : {}
                          }
                        >
                          {option}
                        </div>
                      </div>
                    ))}
                    <div className="flex-column">
                      <div className=" fs-20 card-title">Time</div>
                      <div className="fs-20">{d.time}</div>
                    </div>
                  </div>
                )
                // </Link>
              )}
            </div>
            </>
)
}
export default Viewnewsection