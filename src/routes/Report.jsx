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
  // console.log("now", val.id);
  useEffect(() => {
    batch();
  }, []);

  const show = () => {
    setpop((p) => !p);
  };

  const fetchitem = async (val) => {
    // e.preventDefault();
    const value = await axios.get("/stdtable", {
      params: {
        id: val,
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
  console.log("showbatch", showbatch);
  return (
    // <div className="container">
    <div className="containerBody">
      <div className="navHead">
        <h3>Reports</h3>
        {
          // <form onSubmit={fetchitem}>
          <select
            // value={val.id}
            className="inputText w-90"
            onChange={(e) => fetchitem(e.target.value)}
            // onChange={(e) => setval((p) => ({ ...p, id: e.target.value }))}
          >
            <option hidden value={""}>
              Please select
            </option>

            {Batch.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
            {/* <div className="tablecontainer"></div> */}
          </select>
          // <br />
          // <button type="submit">Submit</button>
          // </form>
        }
      </div>
      <div className="wrapper">
        <div className="mainContainer">
          <div className="content">
            <Table data={showbatch} />
            {/* {showbatch.map(
              (d, i) => (
                // <Link to={String(d.id)}>
                <div key={i} className="btn primary flex-row jc-sb">
                  <div className="flex-column">
                    <div className=" fs-20 card-title">Name</div>
                    <div className="fs-20">{d.Name}</div>
                  </div>
                  <div className="flex-column">
                    <div className=" fs-20 card-title">Mark</div>
                    <div className="fs-20">{d.c_mark}</div>
                  </div>
                  <div className="flex-column">
                    <div className=" fs-20 card-title">Level</div>
                    <div className="fs-20">{d.c_level}</div>
                  </div>
                </div>
              )
              // </Link>
            )} */}
          </div>
          {/* <Table data={showbatch} /> */}
        </div>
      </div>
    </div>
  );
};

export default Report;
