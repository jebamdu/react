import Admin from "./routes/Admin";
import "./app.css";
import { Outlet, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import User from "./routes/User";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/admin/*" element={<Admin />} />
      <Route path="/user/*" element={<User />} />
      <Route path="/*" element={<h1>Page not found</h1>} />
    </Routes>
  );
}

export default App;
