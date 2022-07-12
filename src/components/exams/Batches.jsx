import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CSVReader from "react-csv-reader";


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
    <div className="containerBody">
      <div className="navHead"><h3>Batches</h3></div>
      <div className="wrapper">
        <div className="mainContainer">
          {/* Addbtn */}
          <button className="addBtn btn btn-text" onClick={() => navigate("../Addbatch")}> Add batches</button>
          <div className="content">
            {show.map(d =>
              <Link to={String(d.id)}>
                <div className="btn primary flex-row jc-sb">
                  <div className="flex-column">
                    <div className=" fs-20 card-title">Name</div>
                    <div className="fs-20">{d.name}</div>
                  </div>
                  <div className="flex-column">
                    <div className=" fs-20 card-title">Start</div>
                    <div className="fs-20">{d.start_at}</div>
                  </div>
                  <div className="flex-column">
                    <div className=" fs-20 card-title">End</div>
                    <div className="fs-20">{d.end_at}</div>
                  </div>
                </div>
              </Link>)}
          </div>
        </div>
      </div>
    </div>
    // <div className="batch">
    //   {/* <Table data={show} /> */}
    // </div>
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
        state:""
      }
  );
  console.log("THis is val", values);
  const [drop, setdrop] = useState([]);
  const [open, setopen] = useState(false);
  const [statename, setstatename] = useState([]);
  const [states, setstates] = useState([]);


  const callstate=async()=>{
    const val=await axios.get("/callstate")
    console.log((val));
    setstates(val.data)

  }

  const droplist = async () => {
    const droplist = await axios.post("/showtrainer", {
      name: undefined,
      id: undefined,
    });
    setdrop(droplist.data);
    callstate()
  };
  useEffect(() => {
    droplist();
  }, []);

  const update = async () => {
    console.log(values);

    const res = await axios.get("/u_batch", {
      params:
      {
        id: values.id,
        trainer: values.trainer,
        name: values.name,
        s_at: values.s_at,
        e_at: values.e_at
      }
    })
    console.log(res);

    if (res) { 
      alert("Updated sucessfully")
      navigate("/admin/trainerCreation/batch")}
    else  (alert("Value has not updated"))





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
        state:values.state,
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

  
  const addele=async (e)=>{
    e.preventDefault()
    const val= await axios.post("/addstate",{"state":statename})
    console.log(val);
    if(val.data){
      alert("insert sucessfully")
      setopen(false)

    }
  }

  const add=async (val)=>{
    console.log(val)
      setstatename(val)
     
  }

  return (
    // <div className="batchout">
    <div className="containerBody">
      <div className="navHead">
     
        <h3>{dValue ? "Update" : "Add"} Batch</h3>
        <button onClick={()=>(setopen(true)) } style={{width:"25%",marginLeft:"60%",background:"Transparent"}} className="btn primary btn-text">Add State</button>
      </div>
      <div className="wrapper">
        <div className="mainContainer">
         
          {
             
               open&&<div className="containerBody" style={{width:"100%"}}>
                <div className="navHead">
        <h3>Upload states</h3>
      </div>
      <div className="wrapper">
        <div className="mainContainer">
          <form onSubmit={addele}>
            
            <CSVReader
              cssInputClass="inputText w-90"
              fileEncoding="ASCII"
              parserOptions={{ skipEmptyLines: true,
                header: true }}
              onFileLoaded={add}
            />
            <button type="submit" className="btn primary btn-text">
              Add
            </button>
          </form>
        </div>
      </div>
                
               </div>
              

          }
           

          
        

          
          <form onSubmit={batchworling}>
            {/* <label>Select the trainer:</label> */}

            <select
              value={values.trainer}
              required
              className="inputText w-90"
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
            <select
              value={values.state}
              required
              className="inputText w-90"
              onChange={(e) =>
                setvalues((p) => ({ ...p, state: e.target.value }))
              }
            >
              <option hidden value={""}>
                Please select
              </option>
              {states.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.state}
                </option>
              ))}
            </select>
            <br />
            {/* <label className="all">Name:</label> */}
            <input
              type="text"
              className="inputText w-90"
              required
              value={values.name}
              placeholder="Name"
              onChange={(e) => setvalues((p) => ({ ...p, name: e.target.value }))}
            />
            <br />
            {/* <label className="all">Start At:</label> */}
            <input
              type="date"
              className="inputText w-90"
              id="start_at"
              name="start_at"
              value={values.s_at}
              required
              onChange={(e) => setvalues((p) => ({ ...p, s_at: e.target.value }))}
            ></input>
            <br />
            {/* <label className="all">End At:</label> */}
            <input
              type="date"
              className="inputText w-90"
              value={values.e_at}
              id="End_at"
              name="start_at"
              required
              onChange={(e) => setvalues((p) => ({ ...p, e_at: e.target.value }))}
            ></input>
            <br />

            <button type="submit" className="btn">{dValue ? "Update" : "Add"} Batch</button>
          </form>
          
          
          </div>


      </div>
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
