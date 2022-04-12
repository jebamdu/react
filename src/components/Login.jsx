import { useEffect, useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import axios from "../instance/axios";
import Header from "./Header";

const Login = () => {
  const navigate = useNavigate();
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
  return (
    <>
      <Header login />
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
        <button type="submit" className="btn">
          Login
        </button>
      </form>
    </>
  );
};

export default Login;
