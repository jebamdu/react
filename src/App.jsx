import Admin from "./routes/Admin";
import "./app.css";
import { Outlet, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import User from "./routes/User";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useLocation,useNavigate } from 'react-router-dom'


function App() {
 
  const location=useLocation()
  const navigate=useNavigate()
  

function headerview(){

  const lockpath= localStorage.getItem("lockpath")
if(lockpath===location.pathname){
console.log(lockpath);
const mylock=lockpath.split("/instruction")
console.log(mylock);
const newlock=mylock[0]+mylock[1]
console.log(newlock);
navigate(newlock)

///user/instruction/23/75[6:18]
}


}

useEffect(() => {
  headerview()
});
  // const [aval, setAval] = useState({""});
  // const [data, setData] = useState([]);
  // const fetch = () => {
  //   setData([
  //     { id: 1, name: "seba" },
  //     { id: 2, name: "dennis" },
  //     { id: 3, name: "moo" },
  //   ]);
  // };
  
  // const subForm = (eve) => {
  //   eve.preventDefault();
  // };
  return (
    // <>
    //   {/* <Test dayt={data}> */}
    //   <h1>
    //     <span>very</span> Good morning
    //     <form action="/" onSubmit={subForm} method="get">
    //       <input
    //         type="text"
    //         value={aval}
    //         onChange={(e) => {
    //           setAval(e.target.value);
    //         }}
    //       />
    //       <button>submit</button>
    //     </form>
    //   </h1>
    //   <h5>sebastin</h5>
    //   {/* </Test> */}
    // </>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/admin/*" element={<Admin />} />
      <Route path="/user/*" element={<User />} />
      <Route path="/*" element={<h1>Page not found</h1>} />
    </Routes>
  );
}

export default App;

// const Test = ({ dayt }) => {
//   // console.log(window.location.pathname);
//   console.log(dayt);

//   const rend_name = dayt.map((val, index) => <h2 key={index}>{val.name}</h2>);
//   console.log(rend_name);
//   // console.log(obj, obj1);
//   return <div className="data">{rend_name}</div>;
// };
