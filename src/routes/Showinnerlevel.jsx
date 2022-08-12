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
  const email = localStorage.getItem("email");

  const [Level, setLevel] = useState([]);
  const [Slevel, setSlevel] = useState([]);
  const [opentab, setopentab] = useState(false);
  const [openbtn, setopenbtn] = useState();
  const [openpractice, setopenpractice] = useState(true);
  const [stream, setstream] = useState("");
  const [level_fun, setlevel_fun] = useState(0);

  const [call, setcall] = useState({
    //[Level[0].id]: true,
    // [Level[1].id]: true,
  });
  console.log(opentab);

  const callinneroff = async (streamname) => {
    console.log("Function is calling");
    const val = await axios.get("/callinneroff", {
      params: { email: email, level: levels, stream: streamname },
    });
    console.log(val);
    if (val.data == "allow") {
      console.log("function is working");
      setopenpractice(false);
      setopenbtn(true);
    } else {
      console.log("This part is working");
      console.log(val.data.id);
      setopenbtn(val.data.id);
      console.log(openbtn);
    }
  };

  // useEffect(() => {

  // }, [levels]);

  useEffect(() => {
    const streamname = localStorage.getItem("stream");
    console.log(streamname, "This is streaming");
    setstream(streamname);
    if (levels > 0) {
      callinneroff(streamname);
    }

    setopenpractice(true);
  }, [levels]);

  const calloffbtn = async () => {
    const val = await axios.post("/calloffbtn", { email: email });
    console.log(val, "this is calloff function");
    // if(typeof (val.data)==="object"){
    // }
    // else if(val.data.length>=1){
    //   console.log(Level,"This is working");
    // }
    // else{
    //   console.log(Level," now This is working");
    // }
    const streamname = localStorage.getItem("stream");
    if (streamname == "Engineering") {
      if(!Array.isArray(val.data)){        
        return setcall({ 20: true, 23: true });}

      return setcall({ 20: true, 23: false });
    }

    if (Array.isArray(val.data) && val.data.length > 0) {
      setcall({ 20: true, 23: false }); //[1,2,...]
    } else if (Array.isArray(val.data)) {
      // setcall(Level[1].id);
      setcall({ 20: false, 23: true });
    } else if (!Array.isArray(val.data)) {
      setcall({ 20: true, 23: true });
      console.log("This need to work");
      // setcall("both"); //{}
    } else {
      alert("Something went wrong");
    }
  };

  const callname = async () => {
    const sol = await axios.get("/getname", { params: { email: email } });
    setname(sol.data);
    calloffbtn();
  };
  
  setTimeout(function () {
    var el = document.getElementById('alwaysFetch');
    el.value = el.value ? window.location.reload() : true;
}, 0);

  const show = async () => {
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
      const level_array=localStorage.getItem("levelarr")
      if(!level_array){
        localStorage.setItem("levelarr",JSON.stringify(level.data))
      }
      const level_array1=JSON.parse(localStorage.getItem("levelarr"))
      console.log(level_array1[0]['id'],"LEvel functin call is working");
      setlevel_fun(level_array1[0]['id'])
    } else {
      const level = await axios.get("/shown", {
        params: {
          level: null,
          type: null,
        },
      });
      console.log("from level 72", level.data);
      setLevel(level.data);
      callname();
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
    navigate(`/user/instruction/${levels}/${id}`);
  };
  const passingid = (id) => {
    navigate(`/user/innerLevel/${name}/${id}`);
  };
  const disfun = (i) => {
    console.log(i, "this is i");
    if (openpractice == false) {
      return false;
    } else {
      console.log("calling by else part");
      console.log(openbtn);
      return i.id != openbtn;
    }
  };

  return (
    <div className="container levelContainer">
      {opentab && <Viewscore tab={setopentab} data={Level} />}

      {Level && !levels ? (
        <>
          <div className="column" style={{ width: "100%" }}>
            <br />
            <div className="topContent">
              {!opentab && (
                <p
                  className="Opentab"
                  onClick={() => {
                    setopentab(true);
                  }}
                >
                  View score
                </p>
              )}

              <h2 style={{ marginBottom: "5px" }}>Hi {name}!!</h2>
              <h3>Which test would you like to take today?</h3>
            </div>
            <br />
            <br />
            <div className="testContainer">
              {Level.map((i) => (
                <button
                  className="btn"
                  //i.id===20 || 23 || true to block all||disabled={i.id===23}
                  disabled={call[i.id]}
                  // disabled={(() => {
                  //   if (call === "both") {
                  //     return true;
                  //   } else if (i.id[1] === call) {
                  //     return false;
                  //   } else {
                  //     return true;
                  //   }
                  // })()}
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
          <button
            className="btnright"
            onClick={() =>{ navigate(`/user/innerlevel/${Name}`)
            localStorage.removeItem("levelarr")
            localStorage.removeItem("times")}}
          >
            Back
          </button>

          <div className="levels">
            {Slevel.map((i, l) => (
              <button
                className="btn"
                disabled={i.id!=level_fun}
                openbtn={openbtn}
                //to block all put true
                // other wise put i.id!==50 ||  51  || 52
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
