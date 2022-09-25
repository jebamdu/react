import { useEffect, useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import axios from "../instance/axios";
import Header from "./Header";
import { flushSync } from "react-dom";
import minjapg from "../assets/mobileapp.jpg";
import { isDisabled } from "@testing-library/user-event/dist/utils";


const Login = () => {
  const navigate = useNavigate();

  const [values, setvalues] = useState({
    name: "",
    accesscode: "",
    enroll_no: "",
    email: "",
    dt_no: "",
    stream: "",
    state: "",
    batch_id: "",
  });
  const stream = ["Engineering", "Non-Engineering"];
  const [batches, setbatches] = useState([]);
  const [state, setstate] = useState(true);
  const [collegestate, setcollegestate] = useState([]);
  const [Dtopen, setDtopen] = useState(false);
  const [openmail, setopenmail] = useState(false);
  const [name, setname] = useState("");  
  
  

  useEffect(() => {
    const d = localStorage.getItem("logedin");
    switch (d) {
      case "admin":
        navigate("/admin");
        break;
      case "user":
        navigate("/user");
        break;
    }
    if(state){
      setname("Admin")
    }
    else{
      setname("User")
    }
  
  }, []);
  const [credential, setCredential] = useState({ userName: "", password: "" });
  const updateCrediential = (e, field) => {
    e.preventDefault();
    setCredential((pre) => ({ ...pre, [field]: e.target.value }));

    
  };
  const batchnames = async (e) => {
    console.log(e,"This is values state");
    const values = await axios.get("/showbatches",{params:{"id":e}});
    setbatches(values.data);
    console.log(values);
  };
  const updatevalue = (e, field) => {
    e.preventDefault();
    setvalues((p) => ({ ...p, [field]: e.target.value }));
    if(field=="state"){
      batchnames(e.target.value);
      
    }
  };

  const action123 = async (e) => {
    e.preventDefault();
    const val = await axios.post("/login", {
      name: values.name,
      email: values.email.toLocaleLowerCase(),
      dt_no: values.dt_no,
      state: values.state,
      enroll_no: values.enroll_no,
      stream: values.stream,
      batch_id: values.batch_id,
      accesscode: values.accesscode,
    }
    
    );

    console.log(val, "data values");
    if (val.data.status == "having" || val.data.status == "inserted") {
      localStorage.setItem("logedin", "user");
      localStorage.setItem("email", values.email.toLocaleLowerCase());
      localStorage.setItem("stream",values.stream)
    
      return navigate("/user");
    } else {
      alert("wrong access code ");
    }
  };

  const login = async (e) => {
    e.preventDefault();
    console.log(credential);

    // //temprory login system
    if (
      credential.userName === "admin" &&
      credential.password === "admin@yep"
    ) {
      localStorage.setItem("logedin", "admin");
      return navigate("/admin");
    }
    // else if (credential.userName === "user" && credential.password === "user") {
    //     localStorage.setItem("logedin", "user");
    //     navigate('/user')
    // }
    // else {
    //     alert("Username or Password is increct")
    //}
    

    const { data } = await axios.post("/login", credential);
    if (data.status === "success") {
      localStorage.setItem("logedin", "user");
      localStorage.setItem("email", credential.userName.toLocaleLowerCase());
      navigate("/User");
      //   window.location.href = "/shown";
    } else {
      alert("Username or Password is incorrect ");
      setCredential({ userName: "", password: "" });
    }
    console.log(data);
  };
  

  const callstate=async ()=>{
    console.log("this is called")
    const val= await axios.get("/callstate")
    console.log(val);
    setcollegestate(val.data)

  }
  const checkmail=()=>{
    const validateEmail=()=> 
    {
        var re = /\S+@\S+\.\S+/;
        return re.test(values.email);
    }
    if(validateEmail('anystring@anystring.anystring')){}else{

      setopenmail(true)
    }

  }
 
    

 
  
useEffect(() => {
  callstate()
}, []);

const Dtfun=()=>{
 const val= values.dt_no
 const secondpart=val.slice(2, );
 var reg = new RegExp('^[0-9]*$');
 if(val.startsWith('DT')&& secondpart.length==11&&reg.test(secondpart)){
  
 }else{
  
  setDtopen(true)
  
 }
}
  return (
    <div className="rwap-fullScreen">

      
      <Header login />
      

      {state ? (
        <div className="newform" style={{height:"80%"}}>
          <div className="logindiv" style={{display:"flex", flexDirection:"row",width:"98vw"}} >
          {!state&& <button style={{}} className="btnstate" onClick={() => setstate(true) } >User</button>}
            
            {state&& <button style={{}} className="btnstate" onClick={() => setstate(false) } >User</button>}
          </div>
          <div className="login" style={{height:"100%"}}>
            <form
              className=""
              style={{ display: "flex", flexDirection: "column" }}
              onSubmit={action123}
            >
              <div className="" style={{display:"flex", flexDirection:"row"}}>
                <div className="loginFormcontainer">
                  <input
                    type="text"
                    onChange={(e) => updatevalue(e, "name")}
                    value={values["name"]}
                    required
                    placeholder="Name"
                  />

                  <input
                    type="text"
                    onChange={(e) => updatevalue(e, "accesscode")}
                    value={values["accesscode"]}
                    required
                    placeholder="AccessCode"
                  />

                  <input
                    type="text"
                    onChange={(e) => updatevalue(e, "email")}
                    value={values["email"]}
                    onClick={()=>(setopenmail(false))}
                    required
                    placeholder="email"
                    onBlur={()=>(checkmail())}
                  />

                  {openmail&&<span style={{color:"red"}}>Please check your mail id</span>}
                  
                  <select required onChange={(e) => updatevalue(e, "state")}>
                    <option hiddenvalue="">Select state</option>
                    {collegestate.map((e) => (
                      <option value={e.id} key={e.id}>
                        {e.state}
                      </option>
                    ))}
                  </select>

                  
                </div>
                <div className="loginFormcontainer">
                  <input
                    type="text"
                    onChange={(e) => updatevalue(e, "dt_no")}
                    value={values["dt_no"]}
                    required
                    onClick={()=>(setDtopen(false))}
  
                    placeholder="DT number"
                    onBlur={()=>{Dtfun()}}
                  />
                  {Dtopen&&<span style={{color:"red"}}>"Please check you DT number"</span>}

                  <select
                    required
                   onChange={(e) => updatevalue(e, "stream")}>
                    <option hiddenvalue="">Stream</option>
                    {stream.map((e, l) => (
                      <option value={e} key={l}>
                        {e}
                      </option>
                    ))}
                  </select>

                  <input
                    type="text"
                    onChange={(e) => updatevalue(e, "enroll_no")}
                    value={values["enroll_no"]}
                    required
                    placeholder="Enrollment number"
                  />
                  <select required onChange={(e) => updatevalue(e, "batch_id")}>
                    <option hiddenvalue="">Please batch</option>
                    {batches.map((e) => (
                      <option value={e.id} key={e.id}>
                        {e.name}
                      </option>
                    ))}
                  </select>

                  
                </div>
              </div>
              <button className="btn loginSubmit" style={{width:"100%"}} disabled={((Dtopen )|| ( openmail))} type="submit">
                Submit
              </button>
            </form>
          </div>                                     
        </div>
      ) : (
        <>
          <div className="bag">
          <div className="logindiv" style={{display:"flex", flexDirection:"row",width:"98vw"}}>
          {!state&& <button style={{}} className="btnstate" onClick={() => setstate(true) } >Admin</button>}
            
            {state&& <button style={{}} className="btnstate" onClick={() => setstate(false) } >Admin</button>}
          </div>
          <form className="login" onSubmit={login}>
            <input
              type="text"
              value={credential["userName"]}
              onChange={(e) => updateCrediential(e, "userName")}
              required
              placeholder="USERNAME"
            />
            <br />
            <input
              type="password"
              required
              value={credential["password"]}
              placeholder="PASSWORD"
              onChange={(e) => updateCrediential(e, "password")}
            />
            <br />
            <button
              type="submit"
              // style={{width:"16em",maxWidth:"71vw"}}
              className="btn"
            >
              Sign in
            </button>
          </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Login;
