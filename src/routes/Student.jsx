import { useEffect, useState } from "react";

import Table from "../components/Table";
import { useNavigate, useParams } from "react-router-dom";

import axios from "../instance/axios";
import { Axios } from "axios";
import Import from "./Import";

const Student = () => {
  const [show, setShow] = useState([]);
  console.log("This is", show);

  const showstds = async () => {
    const res = await axios.get("/showstds");
    console.log(res.data);
    return setShow(res.data);
  };

  useEffect(() => {
    showstds();
  }, []);

  return (
    <div className="student">
      <Table data={show} />
      {/* <Import /> */}
    </div>
  );
};

export default Student;

const Studentupdate = () => {
  const navigate=useNavigate()
  const val = useParams();
  const ID = val["ID"];
  //val=val['ID']
  console.log("ID is", ID);
  // const value=fetch(ID)
  const [value, setValue] = useState({});
  const [drop, setdrop] = useState([]);
  const update = async(e) => {
    e.preventDefault();
    console.log("The value is", value);
    const val=await axios.get("/updatequery",{
      params:{
        id:value.id,
        name:value.name,
        ph_no:value.ph_no,
        email_id:value.email_id,
        batch_id:value.batch_id
      }
    })

    if (val) navigate("/admin/students")
    else alert("You have not able to update")
    
    //const up=await axios.get("/updateval",{params:{

    //}})
  };
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("/updatestdudent", { params: { id: ID } });
      console.log(res);
      setValue(res.data[0]);
      const droplist = await axios.get("/showbatches");
      setdrop(droplist.data);
    }
    fetch();
  }, [ID]);
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
    <div className="one">
      <form onSubmit={update}>
        <select
          value={value.batch_id}
          required
          onChange={(e) =>
            setValue((p) => ({ ...p, batch_id: e.target.value }))
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
          value={value.name}
          placeholder="Name"
          onChange={(e) => setValue((p) => ({ ...p, name: e.target.value }))}
        />
        <br />
        <label className="all">email_id:</label>
        <input
          type="text"
          required
          value={value.email_id}
          placeholder="Email_id"
          onChange={(e) =>
            setValue((p) => ({ ...p, email_id: e.target.value }))
          }
        />
        <br />
        <label className="all">Phone No:</label>
        <input
          type="text"
          required
          value={value.ph_no}
          placeholder="Email_id"
          onChange={(e) => setValue((p) => ({ ...p, ph_no: e.target.value }))}
        />

        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
export { Studentupdate };
