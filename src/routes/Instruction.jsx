import { useNavigate, useParams } from "react-router-dom";

const Instruction = () => {
  const navigate = useNavigate();
  const { level } = useParams();
  return (
    <div className="instruction">
      <h1>Instructions</h1>
      <br />
      <br />
      <ul>
        <li>Each category consists of ten sets of questions.</li>
        <br />
        <li>
          Candidates are asked to take up the test within the given period of
          time.
        </li>
        <br />
        <li>
          Once you have finished answering a question, You cannot access the
          previous question.
        </li>
        <br />
        <li>
          After completing the given sets of question,The candidates are asked
          to tap the submit button.
        </li>
        <br />
        <li>
          Failing to tap the submit button will result in disqualification of
          the entire category.
        </li>
      </ul>
      <br />
      <br />
      <button onClick={() => navigate(`/User/instruction/showlevel/${level}`)}>proceed</button>
    </div>
  );
};

export default Instruction;
