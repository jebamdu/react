import "react-calendar/dist/Calendar.css";
import React, { useState } from "react";

import { useEffect } from "react";
import axios from "../instance/axios";


const Validate = () => {
  const [code, setcode] = useState("Loading...");
  const callcode=async()=>{
    const val= await axios.get("/calltodaycode")
    if(val){
      setcode(val.data)
    }
   console.log(val)

  }
  

  useEffect(() => {
   callcode()
  }, []);

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
      <div className="innerlilcontainer">
        <div className="littlecontainer">
            <label  >Todays code</label>
            <h1>{code}</h1>
        </div>
        
      </div>
    </div>
  );
};
export default Validate;
