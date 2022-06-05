import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useParams, Link } from "react-router-dom";
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
      <div className="containerBody">
        <div className="navHead">
          <h3>
            Trainers
          </h3>
        </div>
        <div className="wrapper">
          <div className="mainContainer">
            {/* Addbtn */}
            <button className="addBtn btn btn-text" onClick={() => navigate("create")}>
              Add trainer
            </button>
            <div className="content">
              {show.map(l => <Link to={String(l.id)}>
                <div className="btn primary">{l.name}</div>
              </Link>)}
              {/* <Link >
            </Link> */}
            </div>
          </div>
        </div>
      </div>
      {/* <Table data={show} /> */}
    </>
  );
};

const 
CreateTrainer = ({ dValue }) => {
  // dValue={name:"some vale"}
  
  const navigate = useNavigate();
  const [data, setData] = useState(dValue ? dValue : {});
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
  const addTname = async () => {
    console.log(data);
    const val = await axios.post("/addTname",{ name: data } );
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
   const add=async(e)=>{
   
      const val = await importCSV(e);
      // alert("import sucessfully", val.toString());
      setData(val)
   }
  return (
    <div className="containerBody">
      <div className="navHead">
        <h3>{dValue ? "Update" : "Add"} Trainer</h3>
      </div>
      <div className="wrapper">
        <div className="mainContainer">
          {/* Addbtn */}
          {/* <div className="content"> */}
          <form className="form" onSubmit={submit}>
          <input type="file"
                className="inputText w-90"
                accept="text/csv" onChange={add} />

            <button type="submit" className="btn">{dValue ? ("Update trainer") : ("Add trainer")}</button>

          </form>
          {/* <Link >
              <div className="btn primary"></div>
            </Link> */}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};
function importCSV(e) {
  return new Promise((resolve, reject) => {
    let list = [];
    var fr = new FileReader();
    fr.onload = function () {
      // console.log(fr.result);
      let headContainer = [];
      fr.result.split("\n").forEach((l, i) => {
        if (i == 0) {
          headContainer = l.split(",").map(h => h.trim());
          return;
        }
        let obj = {};
        let row = l.split(",");
        if (row.length === 1 && headContainer.length > 1) return;
        row.forEach((w, i) => {
          obj[headContainer[i]] = w.trim();
        });
        list.push(obj);
      });
      // console.log(list);
      // return list;
      resolve(list);
      // importPage(list)
    };
    try {
      fr.readAsText(e.target.files[0]);
    } catch (e) {
      console.error(e);
      reject("Can't read data from the file");
    }
    //   importFile.value = "";
  });
  // return promData
}


const UpdateTrainer = () => {
  const val = useParams();
  const ID = val["ID"];
  //val=val['ID']
  console.log("ID is", ID);
  // const value=fetch(ID)
  const [Value, setValue] = useState([]);
  const [name, setname] = useState({name:"",id:""});
  console.log(Value);
  const fetch = async () => {
    const res = await axios.get("/fetch_U_name", { params: { id: ID } });
    console.log(res);
    setValue(res.data);
    
  };
  useEffect(() => {
    fetch();
  },[ID]);
  const update_trainer=()=>{
    console.log("jhbjhb");
  
  }


  return (
  <div className="container" style={{height:"100%",width:"100%"}}>
    <div className="innercontainer" style={{height:"250px",width:"120vh" , backgroundColor:"white",textAlign:"center",marginTop:"150px",marginLeft:"150px"}}>
      <form onSubmit={update_trainer} style={{margin:"10vh"}}>
        <label style={{fontSize:"20px"}}>Name: </label>
      <input style={{fontSize:"20px"}}type="text" value={Value.name} onChange={(e)=>(setValue((p)=>({...p,name: e.target.value} )))}/>
      <br /><br />
      <button type="submit" className="btn" style={{width:"50vh"}}>submit</button>
      </form>
    </div>
    </div>
  )
  
};
