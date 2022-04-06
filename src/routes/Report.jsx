import { useEffect, useState } from "react";
import Table from "../components/Table";
import axios from "../instance/axios";

const Report = () => {
  const [Batch, setBatch] = useState([]);
  const [showbatch, setshowbatch] = useState([]);
  const [val, setval] = useState({ val: "" });
  const [pop, setpop] = useState();

  const batch = async () => {
    const val = await axios.get("/batches");
    console.log(val.data);

    return setBatch(val.data);
  };
  console.log("now", val.id);
  useEffect(() => {
    batch();
  }, []);

  const show = () => {
    setpop((p) => !p);
  };

  const fetchitem = async (e) => {
    e.preventDefault();
    const value = await axios.get("/stdtable", {
      params: {
        id: val.id,
      },
    });
    console.log("length", value.length);
    console.log("value", value.data);
    if (value.data.length > 0) {
      setshowbatch(value.data);
      show();
    } else {
      setshowbatch([]);
      alert("No persons added in the batch");
    }
  };

  return (
    <div className="container">
      {
        <form onSubmit={fetchitem}>
          <select
            value={val.id}
            onChange={(e) => setval((p) => ({ ...p, id: e.target.value }))}
          >
            <option hidden value={""}>
              Please select
            </option>

            {Batch.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
            <div className="tablecontainer"></div>
          </select>
          <br />
          <button type="submit">Submit</button>
        </form>
      }
      <Table data={showbatch} />
    </div>
  );
};

export default Report;
