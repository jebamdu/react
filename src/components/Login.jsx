import { useEffect, useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import axios from "../instance/axios";
import Header from "./Header";

const Login = () => {
  const navigate = useNavigate();
 
  const [values, setvalues] = useState({
    name: "",
    accesscode: "",
    enroll_no:"",   
    email: "",
    dt_no:"",
    stream:"",
    college:"",
    batch_id:""


  });
  const stream=["Engineering","Non-Engineering"]
  const [batches, setbatches] = useState([]);
  const [state, setstate] = useState(true);

 
  
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
  }, []);
  const [credential, setCredential] = useState({ userName: "", password: "" });
  const updateCrediential = (e, field) => {
    e.preventDefault();
    setCredential((pre) => ({ ...pre, [field]: e.target.value }));
  };
  const updatevalue = (e, field) => {
    e.preventDefault();
    setvalues((p) => ({ ...p, [field]: e.target.value }));
  };
  
  const action123 = async(e) => {
    e.preventDefault();
   const val=await axios.post("/login",{ "name": values.name,
    "email": values.email,
    "dt_no": values.dt_no,
  "college":values.college,
"enroll_no":values.enroll_no,
"stream":values.stream,
"batch_id":values.batch_id,
"accesscode":values.accesscode})

   console.log(val,"data values");
   if(val.data.status=='having' || val.data.status=='inserted'){
    localStorage.setItem("logedin","user");
    localStorage.setItem("email",values.email);
    return navigate("/user");
  }
  else{
    alert("wrong access code ")
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
      localStorage.setItem("email", credential.userName);
      navigate("/User");
      //   window.location.href = "/shown";
    } else {
      alert("Username or Password is incorrect ");
      setCredential({ userName: "", password: "" });
    }
    console.log(data);
  };
  const batchnames = async () => {
    const values = await axios.get("/showbatches");
    setbatches(values.data);
    console.log(values);
  };
  useEffect(() => {
    batchnames();
  }, []);

  
 
  return (
    <div className="wrap-fullScreen">
      <Header login />

      

       
        
        {state ?(
          <div className="newform">
            <div className="logindiv">
        <button onClick={()=>(setstate(true))} >User</button>
        <button onClick={()=>(setstate(false))}>Admin</button>
            </div>
            <div className="login">

              <form onSubmit={action123}>

                <input type="text"
                onChange={(e)=>(updatevalue(e,"name"))}
                value={values["name"]}
                required            
                placeholder="Name"/>

                 <input type="text"
                onChange={(e)=>(updatevalue(e,"accesscode"))}
                value={values["accesscode"]}
                required            
                placeholder="AccessCode"/>

                <input type="text"
                onChange={(e)=>(updatevalue(e,"email"))}
                value={values["email"]}
                required            
                placeholder="email"/>

                  <select  onChange={(e)=>(updatevalue(e,"batch_id"))}>
                    <option hiddenvalue="">Please batch</option>
                    {
                      batches.map((e)=>(
                        <option value={e.id} key={e.id}>{e.name}</option>
                      ))
                    }
                  </select>

                
                  <input type="text"

                onChange={(e)=>(updatevalue(e,"dt_no"))}
                value={values["dt_no"]}
                required            
                placeholder="DT number"/>

                <select onChange={(e)=>(updatevalue(e,"stream"))}>
                    <option hiddenvalue="">Stream</option>
                      {
                        stream.map((e,l)=>(
                          <option value={e} key={l}>{e}</option>
                        ))
                      }
                    
                </select>

                <input type="text"
                onChange={(e)=>(updatevalue(e,"enroll_no"))}
                value={values["enroll_no"]}
                required            
                placeholder="Enrollment number"/>

                <input type="text"
                onChange={(e)=>(updatevalue(e,"college"))}
                value={values["college"]}
                required            
                placeholder="College Name"/>


                
                      <button className="btn" type="submit">Submit</button>




              </form>


            </div>
             
          </div>
        ):(
        <>

        <div className="logindiv">
        <button onClick={()=>(setstate(true))} >User</button>
        <button onClick={()=>(setstate(false))}>Admin</button>
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
          </>
        )}
       
      
    </div>
  );
};

export default Login;
