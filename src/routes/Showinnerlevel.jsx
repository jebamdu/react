import { Axios } from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "../instance/axios";
const Showinnerlevel = () => {
  const pram = useParams();
  console.log(pram);
  const { Name, levels } = pram;

  const [Level, setLevel] = useState([]);
  const [Slevel, setSlevel] = useState([]);

  const navigate = useNavigate();
  console.log("level is now", Level);
  console.log("level is", Slevel);
  useEffect(() => {
    show();
  }, [levels]);

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

  const takelevel = (id) => {
   
      navigate(
        `/user/instruction/${levels}/${id}`
      )}
  const passingid = (id) => {
    navigate(`/user/innerLevel/${Name}/${id}`);
  };

  return (
    <div className="container">
      {Level && !levels ? (
        <>
          <div className="column" style={{ width: "100%" }}>
            <br />
            <div className="topContent">
              <h2 style={{ marginBottom: "5px" }}>Hi {Name}!!</h2>
              <h3>Would you like to take test in</h3>
            </div>
            <br />
            <br />
            <div className="innercontainer testContainer">
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
