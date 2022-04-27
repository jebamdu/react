import { Axios } from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "../instance/axios";
const Showinnerlevel = () => {
  const { Name } = useParams();
  const [Level, setLevel] = useState(0);
  const [Slevel, setSlevel] = useState([]);
  const navigate = useNavigate();
  console.log("level is now", Level);
  console.log("level is", Slevel);
  useEffect(() => {
    show();
  }, []);

  const show = async () => {
    const level = await axios.get("/shown", {
      params: {
        level: null,
        type: null,
      },
    });

    setSlevel(level.data);
  };

  const takelevel = (id) => {
    const type = async () => {
      const val = await axios.get("/shown", {
        params: {
          level: id,
          type: null,
        },
      });

      navigate(
        `/user/instruction/${val.data[Level - 1].lev_id}/${
          val.data[Level - 1].id
        }`
      );
    };
    type();
  };

  return (
    <div className="container">
      {Level === 0 ? (
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
              <button
                className="btn"
                onClick={() => {
                  setLevel(1);
                }}
              >
                Verbal
              </button>

              <button
                className="btn"
                onClick={() => {
                  setLevel(2);
                }}
              >
                Numerical
              </button>

              <button
                className="btn"
                onClick={() => {
                  setLevel(3);
                }}
              >
                Logical
              </button>
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
