import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavHead from "../NavHead";
import addBtn from "../../assets/addBtn.svg";
import axios from "../../instance/axios";

const ShowLevels = ({}) => {
  const [levelList, setLevelList] = useState([]);
  const takelevel = async() => {

    
    const val= await axios.get("/shown",{params:{
      level:null,
      type:null
     
    }})
    console.log(val); 
    return setLevelList(val.data)
  }
  useEffect(() => {
    takelevel()
    
  }, []);
   
  

  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState("");
  const show = () => {
    setShowPopup((p) => !p);
  };
 
   

  const popupSubmit = (e) => {
    e.preventDefault();
    show();
    insert()

  };

  const insert = async() => {
    console.log();
    const val= await axios.post("/insert",{
      time:popupData,//send as name
      name:null
    })
    if (val){
      console.log("hiii");
      return ShowLevels()
    }

  }
  return (
    <div className="containerBody">
      <NavHead title="Exams" />
      <div className="wrapper">
        <div className="mainContainer">
          {showPopup && (
            <Popup
              data={popupData}
              submit={popupSubmit}
              setData={setPopupData}
              hide={show}
            />
          )}
          {/* <button onClick={() => alert("hi")}>img</button> */}
          <img className="addBtn" onClick={show} src={addBtn} alt="Add level" />
          <div className="content">
            {levelList.map((l, i) => (
              <Link key={i} to={String(l.id)}>
                <button className="btn primary">{l.name}</button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Popup = ({ hide: hidecall, submit, setData, data }) => {
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
              onChange={(e) => setData(e.target.value)}
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

export default ShowLevels;
