import { useEffect } from "react";
import { useNavigate, useParams,useLocation } from "react-router-dom";


const Instruction = () => {
  const navigate = useNavigate();
  const location=useLocation()
  const { level,type } = useParams();
  console.log(level,"lev is")
  console.log(type,"cat id is")


  useEffect(() => {
   const lockpath=localStorage.getItem("lockpath") 
   if(lockpath){
    console.log(location.pathname);
    localStorage.setItem("lockpath",location.pathname)
   }
   else{
    localStorage.setItem("lockpath",location.pathname)
   }
   
  }, []);


  return (
    <div className="instruction">
      <h1>Instructions</h1>
      <br />
      <br />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          navigate(`/User/${level}/${type}`);
        }}
      >
        <ul>
          <li>
            <input type={"checkbox"} required />
            Each category consists of ten sets of questions.
          </li>
          <br />
          <li>
            <input type={"checkbox"} required />
            Candidates are asked to take up the test within the given period of
            time.
          </li>
          <br />
          <li>
            <input type={"checkbox"} required />
            Once you have finished answering a question, You cannot access the
            previous question.
          </li>
          <br />
          <li>
            <input type={"checkbox"} required />
            After completing the given sets of question,the candidates are asked
            to tap the submit button.
          </li>
          <br />
          <li>
            <input type={"checkbox"} required />
            Failing to tap the submit button will result in disqualification of
            the entire category.
          </li>
        </ul>
        <br />
        <br />
        <button
          className="btn"
          type="submit"
          // onClick={}
        >
          proceed
        </button>
      </form>
    </div>
  );
};

export default Instruction;
