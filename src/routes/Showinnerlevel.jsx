import { Axios } from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "../instance/axios";
import Viewscore from "./Viewscore";
const Showinnerlevel = () => {
  const pram = useParams();
  console.log(pram);
  const { Name, levels } = pram;
  const [name, setname] = useState("");
  const email=localStorage.getItem("email")

  const [Level, setLevel] = useState([]);
  const [Slevel, setSlevel] = useState([]);
  const [opentab, setopentab] = useState(false);
  console.log(opentab);

  
  const show = async () => {
    setname(email)
    if (levels) {
      console.log(levels, "this is");
      const level = await axios.get("/shown", {
        params: {
          level: levels,
          type: null,
        },
      });
      console.log("lelvvel", level);
      setSlevel(level.data);
    } else {
      const level = await axios.get("/shown", {
        params: {
          level: null,
          type: null,
        },
      });
      setLevel(level.data);
      
    }
  };


  const navigate = useNavigate();
  console.log("level is now", Level);
  console.log("level is", Slevel);
  useEffect(() => {
    show();
    console.log("it is calling");
  }, [levels]);


  const takelevel = (id) => {
   
      navigate(
        `/user/instruction/${levels}/${id}`
      )}
  const passingid = (id) => {
    navigate(`/user/innerLevel/${name}/${id}`);
  };

  return (
    <div className="container levelContainer">
      {opentab&& <Viewscore tab={setopentab} data={Level}/>}
      

      
      {Level && !levels ? (
        <>
          <div className="column" style={{ width: "100%" }}>
            <br />
            <div className="topContent"> 
               
              {!opentab&&<p className="Opentab" onClick={()=>{setopentab(true) }}>View score</p>}
              
              <h2 style={{ marginBottom: "5px" }}>Hi {name}!!</h2>
              <h3>Which test would you like to take today?</h3>
            </div>
            <br />
            <br />
            <div className="testContainer">
              {Level.map((i) => (
                <button
                  className="btn"
                  onClick={() => {
                    passingid(i.id);
                  }}
                  key={i.id}
                >
                  {i.name}{" "}
                </button>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="levels">
            {Slevel.map((i, l) => (
              <button
                className="btn"
                onClick={() => {
                  takelevel(i.id);
                }}
                key={i.id}
              >
                {i.name}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Showinnerlevel;
