import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "../instance/axios";

const Showlevel = () => {
  const { lev_id } = useParams();
  const navigate = useNavigate();
  const [Show_level, setShow_level] = useState({});
  console.log("hiii");
  //   if (lev_id == null) {
  //     lev_id = 1;
  //     show_levels();
  //   } else
  if (lev_id >= 3) {
    alert("You have Completed all the levels");
    navigate("/User");
  }
  const show_levels = async () => {
    const show = await axios.post("/show", {
      lev_id: lev_id,
    });
    setShow_level(show.data);
    console.log(show);
  };
  useEffect(() => {
    show_levels();
  }, []);

  return (
    <div className="show">
      <Link to={`/User/${Show_level.id}`}>
        <button>{Show_level.name}</button>
      </Link>
    </div>
  );
};

export default Showlevel;
