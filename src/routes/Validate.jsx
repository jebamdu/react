import "react-calendar/dist/Calendar.css";
import React, { useState } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import axios from "../instance/axios";
import Table from "../components/Table";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Validate = () => {
  const [value, onChange] = useState(new Date());
  const [shocal, setshocal] = useState(false);
  const [data, setdata] = useState([]);
  const [batch, setbatch] = useState([]);
  const [batch_id, setbatch_id] = useState({});
  const navigate=useNavigate()
  console.log(value);
  const thisx = moment(value).format("YYYY-MM-DD");
  console.log(thisx, "date");

  const callbatch = async () => {
    console.log(batch_id, "batch id");

    const values = await axios.post("/fetchcandidate", {
      date: thisx,
      batch: batch_id.batch_id,
    });
    setdata(values.data);
  };

  const opencalender = () => {
    setshocal(true);
  };
  const run = async (e) => {
    e.preventDefault();

    const sol = await axios.post("/dropbatch", {
      date: thisx,
    });

    console.log(sol.data, "values");
    setbatch(sol.data);
    setshocal(false);
  };
  
  const sellectall=async()=>{

    const val=await axios.post("/inputele",{data:data,batch:batch_id})

    if(val.data){
        alert("Inserted sucessfully")
        navigate("../students")

    }
    
        
  }
  const deleteall=async()=>{
    const val=await axios.post("/deletestudent",{data:data})
    if(val.data){
        setdata([])
    }
    console.log(data,"for delete all"); 
  }
  const insertcandidate=async(id)=>{
    const val=data.find((e) => e.email == id)  
    const insert=await axios.get("/inputstudentroute",{params:{data:val,batch:batch_id}}
    )
    if(insert.data){
        setdata(data.filter((e) => e.email != id)); 
    }
    console.log(val,"values");
  }
  const deletefun = async(id) => {
    console.log(id, "delete id");
    const val=data.find((e) => e.email == id)  
    const deleteval= await axios.get("/delstd",{params:{data:val}})
    if(deleteval){
        console.log(deleteval,"deletequery");
    }
    setdata(data.filter((e) => e.email != id));
  };

  useEffect(() => {
    callbatch();
  }, [batch_id]);

  return (
    <div
      className="container"
      style={{
        backgroundColor: "white",
        marginLeft: "100px",
        marginTop: "70px",
        height: "500px",
        width: "1000px",
      }}
    >
      <div className="innercontainer">
        <button
          style={{
            position: "absolute",
            marginLeft: "750px",
            marginTop: "7px",
            maxWidth: "250px",
            border: "1px",
            
            backgroundColor: "transparent",
          }}
          onClick={opencalender}
          className="btn"
        >
          Select date
        </button>
        {batch && (
          <>
           

            {batch && (
              <select
                onChange={(e) =>
                  setbatch_id((p) => ({ ...p, batch_id: e.target.value }))
                }
                style={{fontSize:"25px",width:"450px",marginTop:"10px",paddingRight:"30px",marginLeft:"40px"}}
                value={batch.id}
              >
                <option value={""}>select please</option>
                {batch.map((e) => (
                  <option value={e.id} key={e.id}>
                    {e.name}
                  </option>
                ))}
              </select>
            )}
            {data && (
                <>
                 <button style={{maxWidth:"120px",margin:"10px 0px 0px 20px",position:"absolute"}} onClick={()=>(sellectall())} className="btn">Select all</button>
                 <button style={{maxWidth:"120px",display:"inline-block",zIndex:"4",margin:"10px 0px 0px 150px",position:"absolute"}} onClick={()=>(deleteall())} className="btn">Delete all</button>
              <div
                className="tablediv"
                style={{ marginLeft: "70px",marginRight: "30px", marginTop: "100px" }}>
                   
                <div className="content">
                  {data.map((d) => (
                    <div className="btn primary flex-row jc-sb">
                      <div className="flex-column">
                        <div className=" fs-20 card-title">Name</div>
                        <div className="fs-20">{d.name}</div>
                      </div>
                      <div className="flex-column">
                        <div className=" fs-20 card-title">Email</div>
                        <div className="fs-20">{d.email}</div>
                      </div>

                      {/* <img src="" alt="" /> */}
                      <button onClick={()=>(insertcandidate(d.email))} style={{ marginRight: "-10px" }}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="25"
                          fill="currentColor"
                          class="bi bi-check"
                          viewBox="0 0 16 16"
                        >
                          <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                        </svg>
                      </button>

                      <button onClick={() => deletefun(d.email)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-x"
                          viewBox="0 0 16 16"
                        >
                          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              </>
            )}
          </>
        )}

        {shocal && (
          <div
            className="div"
            style={{
              position: "absolute",
              marginLeft: "600px",
              marginTop: "-50px",
              zIndex: 1,
            }}
          >
            <form onSubmit={run} style={{position:"absolute",marginTop:"10px"}}>
              <Calendar onChange={onChange} value={value} />

              <button
                type="submit"
                className="btn"
                style={{ marginTop: "20px" }}
              >
                ok
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
export default Validate;
