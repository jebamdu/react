import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import axios from "../../instance/axios";
import Trainspop from "../popups/trainer";
import Table from "../Table";
import Batch, { Addbatch, Batchupdate } from "./Batches";

const Trainer = () => {
  return (
    <Routes>
      <Route path="" element={<Showtrainer />}></Route>
      <Route path="create" element={<CreateTrainer />}></Route>
      <Route path=":ID" element={<UpdateTrainer />}></Route>{" "}
      <Route path="batch" element={<Batch />}></Route>
      <Route path="Addbatch" element={<Addbatch />}></Route>
      <Route path="batch/:ID" element={<Batchupdate />}></Route>{" "}
      {/* : is tht highlight because thr nxt ### string take it as argument*/}
    </Routes>
  );
};

export default Trainer;

const Showtrainer = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState([]);
  const fetch = async () => {
    const { data } = await axios.post("/showtrainer", {
      name: undefined,
      id: undefined,
    });

    // view(data);
    setShow(data);
    console.log("data", data);
  };

  useEffect(() => {
    fetch();
  }, []);

  // const updatetag = (e, field) => {
  //   const name = (name) => ({ ...name, [field]: e.target.value });
  //   call(name);
  //   const call = async () => {
  //     const { val } = await axios.get("/updatename", {
  //       params: {
  //         name: e.name,
  //         id: e.id,
  //       },
  //     });
  //   };
  // };

  return (
    <>
      <button className="" onClick={() => navigate("create")}>
        Add trainer
      </button>
      <Table data={show} />
    </>
  );
};

const CreateTrainer = ({ dValue }) => {
  // dValue={name:"some vale"}
  const navigate = useNavigate();
  const [data, setData] = useState(dValue ? dValue : { name: "" });
  console.log(data);
  const submit = (e) => {
    e.preventDefault();
    console.log("the data is", data);

    if (!dValue) {
      addTname(data);
    } else {
      updateTname();
    }

    // call axios and create trainer in backend then redirect the route to createTrainer

    //if the dValue is available then call the update route otherwise call the create trainer route
  };
  const addTname = async (data) => {
    const val = await axios.get("/addTname", { params: { name: data.name } });
    console.log(val);
    if (val["data"]) {
      navigate("/admin/trainerCreation");
    } else {
      alert("Something went problem");
    }
  };
  const updateTname = async () => {
    const val = await axios.get("/updatename", {
      params: {
        value: data,
      },
    });
    const end = val.data.status;
    if (end) {
      navigate("/admin/trainerCreation");
    } else {
      alert("Something went wrong");
    }
  };
  return (
    <form onSubmit={submit}>
      <input
        type="text"
        value={data.name}
        onChange={(e) => setData((p) => ({ ...p, name: e.target.value }))}
        placeholder="Trainer name"
      />
      {dValue ? (
        <button type="submit">update trainer</button>
      ) : (
        <button type="submit">Add trainer</button>
      )}
    </form>
  );
};

const UpdateTrainer = () => {
  const val = useParams();
  const ID = val["ID"];
  //val=val['ID']
  console.log("ID is", ID);
  // const value=fetch(ID)
  const [value, setValue] = useState(null);
  console.log(value);
  const fetch = async () => {
    const res = await axios.get("/fetch_U_name", { params: { id: ID } });
    console.log(res);
    setValue(res.data);
  };
  useEffect(() => {
    fetch();
  }, [ID]);
  return <CreateTrainer key={value} dValue={value} />;
};
