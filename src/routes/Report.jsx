import { useEffect, useReducer, useRef, useState } from "react";
import { CSVDownload } from "react-csv";
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
  const [download, setDownload] = useState(null);
  const [csvfile, setcsvfile] = useState(null);
  const [State, setState] = useState([]);

  const [categoryname, setcategoryname] = useState([]);
  // const [data, setdata] = useState(0);

  const [pop, setpop] = useState("");

  const callcatagory = async () => {
    const values = await axios.get("/shown", {
      params: { level: null, type: null },
    });
    setlevel(values.data);
  };

  
  const showstateroute=async()=>{
    const val = await axios.get("/showstate");
    console.log(val.data);
    callcatagory();
    return setState(val.data);
  }
  const batch = async (id) => {
    const val = await axios.get("/batches");
    console.log(val.data);
    callcatagory();
    return setBatch(val.data);
  }
  // console.log("now", val.id);
  useEffect(() => {
    batch()
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
  const extract_stud_detail_mark = async (id) => {
    console.log(c_lev, "current level");
    const jsonobj={id: c_lev,
      cat_id: idarray,
      email: showbatch.map((i) => i["email"])}
    const extract_stud_detail = fetch("http://13.234.49.189/extract_stud_detail_csv", {
      method: 'POST',body: JSON.stringify(jsonobj)
      
    }).then(response=>{return response.json()}).then(data=>{setextractdata(
      data[0].filter((v) => Object.entries(v).length)
    )})
    console.log(extract_stud_detail)
    // setextractdata(
    //   extract_stud_detail.data[0].filter((v) => Object.entries(v).length)
    // );
  };
  const showbatchroute=async(id)=>{
    
    // batch(id)
  }
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
          // <select
          //   // value={val.id}
          //   className="inputText w-90"
          //   onChange={(e) =>showbatchroute(e.target.value)}
          //   // onChange={(e) => fetchitem(e.target.value)}
          //   // onChange={(e) => setval((p) => ({ ...p, id: e.target.value }))}
          // >
          //   <option hidden value={""}>
          //     Select State
          //   </option>

          //   {State.map((e) => (
          //     <option key={e.id} value={e.id}>
          //       {e.state}
          //     </option>
          //   ))}
          //   {/* <div className="tablecontainer"></div> */}
          // </select>
          // // <br />
          // // <button type="submit">Submit</button>
          // // </form>
        }
        {Batch&&
          
          <select
           
            className="inputText w-90"
            onChange={(e) => fetchitem(e.target.value)}
           
          >
            <option hidden value={""}>
              select
            </option>

            {Batch.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
            
          </select>
          
        }
      </div>
      <div className="wrapper">
        <div className="mainContainer">
          <div className="content">
            {show_exact_mark && (
              <button
                className="btn primary"
                style={{
                  width: "max-content",
                  position: "absolute",
                  right: "47%",
                  top: "1%",
                }}
                onClick={() => setshow_exact_mark(false)}
              >
                back
              </button>
            )}

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

            {download&&<CSVDownload headers={download} data={extractdata} target="_blank" />}
            {csvfile&&<CSVDownload headers={csvfile} data={showbatch} target="_blank" />}
           
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
                

                //genarate CSV String
                if (show_exact_mark) {
                  let d = []; //["name","email_id","Basic","attempt(B)","Intermediate","attempt(I)"]
                  for (let a in extractdata[0]) {
                    d.push(a);
                  }
                  const headers = d.map((d) => ({ label: d, key: d }));

                  setDownload(headers);
                } else {
                  let d = []; //["name","email_id","Basic","attempt(B)","Intermediate","attempt(I)"]
                  for (let a in showbatch[0]) {
                    d.push(a);
                  }
                  const head = d.map((d) => ({ label: d, key: d }));
                  setcsvfile(head)
                  
                }}}
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
