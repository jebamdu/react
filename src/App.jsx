import Admin from "./routes/Admin";
import "./app.css";
import { Outlet, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import User from "./routes/User";
import { useState } from "react";
import { Line } from "react-chartjs-2";

function App() {
  // const [aval, setAval] = useState({""});
  // const [data, setData] = useState([]);
  // const fetch = () => {
  //   setData([
  //     { id: 1, name: "seba" },
  //     { id: 2, name: "dennis" },
  //     { id: 3, name: "moo" },
  //   ]);
  // };
  // useEffect(() => {
  //   fetch();
  // }, []);
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
