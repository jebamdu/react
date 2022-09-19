import { useEffect, useState } from "react";

import Table from "../components/Table";
import { Link, useNavigate, useParams } from "react-router-dom";

import axios from "../instance/axios";
import { Axios } from "axios";
import Import from "./Import";

const Student = () => {
  const [show, setShow] = useState([]);
  const [stud, setstud] = useState([]);
  const navigate = useNavigate();
  console.log("This is", show);

  const showstds = async () => {
    const res = await axios.get("/batches");
    console.log(res.data);
    return setShow(res.data);
  };

  useEffect(() => {
    showstds();
  }, []);

  const showstud = async (id) => {
    const val = await axios.get("/showstds", { params: { id: id } });
    console.log(val);
    setstud(val.data);
  };

  return (
    <div className="containerBody">
      <div className="navHead">
        <h3>Students</h3>
        <select className="box" onChange={(e) => showstud(e.target.value)}>
            <option hiddenvalue="">Please Select</option>
            {show.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
          </select>
      </div>
      <div className="wrapper">
        <div className="mainContainer">
           
          

          {/* Addbtn */}
          {/* <button className="addBtn btn btn-text" onClick={() => navigate("../Addbatch")}> Add batches</button> */}
          <div className="content">
            {stud.map((d,i) => (
              <Link to={String(d.id)}>
                <div className="btn primary flex-row jc-sb">
                <div className="flex-column">
                    <div className=" fs-20 card-title">{i+1}</div>
                    
                  </div>
                  <div className="flex-column">
                    <div className=" fs-20 card-title">Name</div>
                    <div className="fs-20">{d.name}</div>
                  </div>
                  <div className="flex-column">
                    <div className=" fs-20 card-title">Email</div>
                    <div className="fs-20">{d.email_id}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
    // <div className="student">
    //   <Table data={show} />
    //   {/* <Import /> */}
    // </div>
  );
};

export default Student;

const Studentupdate = () => {
  const navigate = useNavigate();
  const val = useParams();
  const ID = val["ID"];
  //val=val['ID']
  console.log("ID is", ID);
  // const value=fetch(ID)
  const [value, setValue] = useState({});
  const [drop, setdrop] = useState([]);
  const update = async (e) => {
    e.preventDefault();
    console.log("The value is", value);
    const val = await axios.get("/updatequery", {
      params: {
        id: value.id,
        name: value.name,
        email_id: value.email_id,
        batch_id: value.batch_id,
      },
    });

    if (val){
      alert("updated Sucessfully")
      navigate("/admin/students");}
    else alert("You have not able to update");

    //const up=await axios.get("/updateval",{params:{

    //}})
  };
  const showbatch=async()=>{
    const droplist = await axios.get("/showbatches");
    console.log(droplist);
    setdrop(droplist.data);
  }
  const fetch = async () => {
    const res = await axios.get("/updatestdudent", { params: { id: ID } });
    console.log(res);
    showbatch()
    setValue(res.data[0]);
    
  };
  useEffect(() => {
 
    fetch();
  },[ID]);
  // useEffect(() => {
  //   const fetch = async () => {
  //     const res = await axios.get("/updatestdudent", { params: { id: ID } });
  //     console.log(res);
  //     setValue(res.data[0]);
  //   };
  //   fetch();
  // }, []);
  //const train_id= await Axios.get("/trainid",{ params: { id: value.batch_id }})

  // const droplist = async () => {
  //   const droplist = await axios.get("/showbatches");
  //   setdrop(droplist.data);
  // };
  // useEffect(() => {
  //   droplist();
  // }, []);
  return (
    // <div className="one">
    <div className="containerBody">
      <div className="navHead">
        <h3>Update Student</h3>
      </div>
      <div className="wrapper">
        <div className="mainContainer">
          <form onSubmit={update}>
            <select
              value={value.batch_id}
              className="inputText w-90"
              required
              onChange={(e) =>
                setValue((p) => ({ ...p, batch_id: e.target.value }))
              }
            >
              <option hidden value={""}>
               {value.batch_name}
              </option>
              {drop.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name}
                </option>
              ))}
            </select>
            <br />
            {/* <label className="all">Name:</label> */}
            <input
              type="text"
              required
              className="inputText w-90"
              value={value.name}
              placeholder="Name"
              onChange={(e) =>
                setValue((p) => ({ ...p, name: e.target.value }))
              }
            />
            <br />
            {/* <label className="all">email_id:</label> */}
            <input
              type="text"
              required
              className="inputText w-90"
              value={value.email_id}
              placeholder="Email_id"
              onChange={(e) =>
                setValue((p) => ({ ...p, email_id: e.target.value }))
              }
            />
            <br />
            {/* <label className="all">Phone No:</label> */}
           
            <button type="submit" className="btn primary">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export { Studentupdate };
