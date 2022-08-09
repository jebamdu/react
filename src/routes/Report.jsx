import { useEffect, useReducer, useRef, useState } from "react";
import Table from "../components/Table";
import axios from "../instance/axios";
import PopChart from "./PopChart";

const Report = () => {
  const [Batch, setBatch] = useState([]);
  const [showbatch, setshowbatch] = useState([]);
  const [level, setlevel] = useState([]);
  const [batch_id, setbatch_id] = useState();
  const [show_exact_mark, setshow_exact_mark] = useState(false);
  const [idarray, setidarray] = useState([]);
  const [c_lev, setc_lev] = useState();
  const [extractdata, setextractdata] = useState([]);
  const extractDataRef = useRef([]);
  const [categoryname, setcategoryname] = useState([]);
  // const [data, setdata] = useState(0);

  const [pop, setpop] = useState("");

  const callcatagory = async () => {
    const values = await axios.get("/shown", {
      params: { level: null, type: null },
    });
    setlevel(values.data);
  };

  const batch = async () => {
    const val = await axios.get("/batches");
    console.log(val.data);
    callcatagory();
    return setBatch(val.data);
  };
  // console.log("now", val.id);
  useEffect(() => {
    batch();
  }, []);

  const fetchitem = async (val) => {
    setbatch_id(val);
  };
  console.log("showbatch", showbatch);
  // const [currentLevel, setCurrentLevel] = useState(null);
  const currentLevel = useRef(null);
  const getlevel = async (id) => {
    currentLevel.current = id;
    setc_lev(id);
    if (batch_id) {
      const values = await axios.get("/stdtable", {
        params: { levelid: id, batchid: batch_id },
      });
      console.log(values);
      setshowbatch(values.data.data[0]);
      setidarray(values.data.data[1]);
    } else {
      alert("Please select the batch");
    }
  };
  function emailFn(email) {
    // console.log(e);
    setpop(email);
  }
  function extract(num) {
    if (num != {}) {
      return num;
    }
  }
  const extract_stud_detail_mark = async () => {
    console.log(c_lev, "current level");
    const extract_stud_detail = await axios.post("/extract_stud_detail", {
      id: c_lev,
      cat_id: idarray,
      email: showbatch.map((i) => i["email"]),
    });
    console.log(extract_stud_detail.data);
    setextractdata(extract_stud_detail.data[0][0]);
    extractDataRef.current = extract_stud_detail.data[0];
    setcategoryname(extract_stud_detail.data[1]);
  };

  const exact_mar_fun = () => {
    setshow_exact_mark(true);
    console.log(idarray, "id array ");
    if (!c_lev && !idarray) {
      return alert("Please check batchname and survey's name");
    }

    extract_stud_detail_mark();
  };

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
      <div className="wrapper" >
        <div className="mainContainer">
          <div className="content">

          {show_exact_mark&& <button
              className="btn primary"
              style={{
                width: "max-content",
                position: "absolute",
                right: "47%",
                top: "1%",
              }}
              onClick={() => (setshow_exact_mark(false))}
            >
              back
            </button> }
          {show_exact_mark &&
            <select
              className="listbox_stdrep"
              style={{ right: "550px" }}
              onChange={(e) =>
                setextractdata(extractDataRef.current[e.target.value])
              }
            >
              {categoryname.map((e, i) => (
                <option value={i} key={i}>
                  {e}
                </option>
              ))}
            </select>}
            <button
              className="btn primary"
              style={{
                width: "max-content",
                position: "absolute",
                right: "32%",
                top: "1%",
              }}
              onClick={() => exact_mar_fun()}
            >
              View more
            </button>
            <button
              className="btn primary"
              style={{
                width: "max-content",
                position: "absolute",
                right: "22%",
                top: "1%",
              }}
              onClick={() => {
                console.log("from export");
                let csv = "";

                //genarate CSV String

                const d = [];
                for (let a in showbatch[0]) {
                  d.push(a);
                  csv += `${a},`;
                }
                csv += "\n";
                showbatch.forEach((v, i) => {
                  d.forEach((h) => (csv += `${v[h]},`));
                  csv += "\n";
                });

                downloadCSV(
                  csv,
                  `report ${Batch.find((d) => d.id == batch_id).name}`
                );

                function downloadCSV(csv, filename) {
                  var csvFile;
                  var downloadLink;

                  //define the file type to text/csv
                  csvFile = new Blob([csv], { type: "text/csv" });
                  downloadLink = document.createElement("a");
                  downloadLink.download = filename;
                  downloadLink.href = window.URL.createObjectURL(csvFile);
                  downloadLink.style.display = "none";

                  document.body.appendChild(downloadLink);
                  downloadLink.click();
                }
              }}
            >
              Export
            </button>
            <select
              className="listbox_stdrep"
              onChange={(e) => getlevel(e.target.value)}
            >
              {level.map((e) => (
                <option value={e.id} key={e.id}>
                  {e.name}
                </option>
              ))}
            </select>

            <br />
            {!show_exact_mark && (
              <Table className="table" emailFn={emailFn} data={showbatch} />
            )}
            {show_exact_mark && <Table className="table" data={extractdata} />}
            {pop && (
              <PopChart
                email={pop}
                hidder={setpop}
                currentLevel={currentLevel}
              />
            )}
            {/* <PopChart /> */}
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
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
