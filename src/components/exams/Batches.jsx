import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from "../../instance/axios";
import Table from "../Table";
const Batch = () => {
  const [show, setshow] = useState([]);
  const navigate = useNavigate();

  const fetch = async () => {
    const val = await axios.get("batches");
    console.log(val);
    setshow(val.data);
  };
  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="batch">
      <button onClick={() => navigate("../Addbatch")}> Add batches</button>
      <Table data={show} />
    </div>
  );
};

export default Batch;

const Addbatch = ({ dValue }) => {
  console.log(dValue);
  const navigate = useNavigate();
  const [values, setvalues] = useState(
    dValue
      ? dValue
      : {
          name: "",
          trainer: "",
          s_at: "",
          e_at: "",
        }
  );
  console.log("THis is val",values);
  const [drop, setdrop] = useState([]);

  const droplist = async () => {
    const droplist = await axios.post("/showtrainer", {
      name: undefined,
      id: undefined,
    });
    setdrop(droplist.data);
  };
  useEffect(() => {
    droplist();
  }, []);

  const update =async () => {
    console.log(values);

    const res= await axios.get("/u_batch",{
        params:
        {
            id:values.id,
            trainer:values.trainer,
            name: values.name,
            s_at: values.s_at,
            e_at: values.e_at
                    }
    })
    console.log(res);
    
    if(res) return navigate("/admin/trainerCreation/batch")
    else return (alert("Value has not updated"))





}

  const batchworling = (e) => {
    e.preventDefault();
    if (!dValue) insert();
    else update()
  };

  const insert = async () => {
    const { data } = await axios.get("/ins_batch", {
      params: {
        trainer: values.trainer,
        name: values.name,
        s_at: values.s_at,
        e_at: values.e_at,
      },
    });

    
     
    

    console.log(data);
    if (data.status) {
      navigate("/admin/trainerCreation/batch");
    }
  };

  return (
    <div className="batchout">
      <form onSubmit={batchworling}>
        <label>Select the trainer:</label>

        <select
          value={values.trainer}
          required
          onChange={(e) =>
            setvalues((p) => ({ ...p, trainer: e.target.value }))
          }
        >
          <option hidden value={""}>
            Please select
          </option>
          {drop.map((e) => (
            <option key={e.id} value={e.id}>
              {e.name}
            </option>
          ))}
        </select>
        <br />
        <label className="all">Name:</label>
        <input
          type="text"
          required
          value={values.name}
          placeholder="Name"
          onChange={(e) => setvalues((p) => ({ ...p, name: e.target.value }))}
        />
        <br />
        <label className="all">Start At:</label>
        <input
          type="date"
          id="start_at"
          name="start_at"
          value={values.s_at}
          required
          onChange={(e) => setvalues((p) => ({ ...p, s_at: e.target.value }))}
        ></input>
        <br />
        <label className="all">End At:</label>
        <input
          type="date"
          value={values.e_at}
          id="End_at"
          name="start_at"
          required
          onChange={(e) => setvalues((p) => ({ ...p, e_at: e.target.value }))}
        ></input>
        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

const Batchupdate = () => {
  const [dvalue, setdvalue] = useState(null);
  const val = useParams();
  const id = val["ID"];
  const fetch = async () => {
    const res = await axios.get("/batch_route", { params: { id: id } });
    console.log(res.data);
    setdvalue({
      ...res.data[0],
      s_at: res.data[0].start_at,
      e_at: res.data[0].end_at,
      trainer: res.data[0].trainer_id,
    });
  };

  useEffect(() => {
    fetch();
  }, [id]);
  return <Addbatch key={dvalue} dValue={dvalue} />;
};

export { Addbatch, Batchupdate };
