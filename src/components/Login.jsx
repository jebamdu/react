import { useEffect, useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import axios from "../instance/axios";
import Header from "./Header";

const Login = () => {
  const navigate = useNavigate();
  const [Sighup, setSighup] = useState(false);
  const [values, setvalues] = useState({
    name: "",
    password: "",
    Rpassword: "",
    email: "",
  });
  const [batches, setbatches] = useState([]);
  const [batch_id, setbatch_id] = useState({});
  const [terms, setterms] = useState(true);
  const [validate, setvalidate] = useState(false);
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
  const insertstudent = async () => {
    console.log("hiii");

    const val = await axios.post("/insertstd", {
      batch_id: batch_id.batch_id,
      name: values.name,
      email: values.email,
      password: values.password,
    });
    console.log(val);
    if (val.data) {
      setvalidate(true);
    }
  };
  const action123 = (e) => {
    e.preventDefault();
    console.log(batch_id, "batchid");
    if (values.password == values.Rpassword) {
      insertstudent();
    } else {
      alert("Your Password is mis match. Please check again.");
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
  }, [Sighup]);

  const settofffunction = () => {
    setvalidate(false);
    setterms(false);
    setSighup(false);
  };

  return (
    <div className="wrap-fullScreen">
      <Header login />

      {validate && (
        <div
          className="container login_success_screen"
          style={{
            marginLeft: "400px",
            marginTop: "120px",
            position: "absolute",
            backgroundColor: "whitesmoke",
            zIndex: "1",
            alignContent: "center",
          }}
        >
          <div
            className="innercontainer"
            style={{ height: "300px", padding: "50px", width: "700px" }}
          >
            <p style={{ fontSize: "25px" }}>
              We will validate your inputs and let you know within 3 working
              days
            </p>
            <br />
            <br />
            <button className="btn" style={{}} onClick={settofffunction}>
              Ok
            </button>
          </div>
        </div>
      )}
      {Sighup ? (
        terms ? (
          <div className="container" style={{ marginLeft: "100px" }}>
            <div className="subcontainer">
              <h1
                className="signup_termsConditions"
                style={{
                  fontSize: "50px",
                  marginLeft: "-80px",
                  marginTop: "50px",
                }}
              >
                Terms and Condition
              </h1>
              <form onSubmit={(e) => setterms(false)}>
                <ul className="terms_container">
                  <li className="termcheckbox">
                    <input type={"checkbox"} required />
                    xxxx
                  </li>
                  <br />
                  <li className="termcheckbox">
                    <input type={"checkbox"} required />
                    yyy
                  </li>
                  <br />
                  <li className="termcheckbox">
                    <input type={"checkbox"} required />
                    zzzz
                  </li>
                  <br />
                  <li className="termcheckbox">
                    <input type={"checkbox"} required />
                    mmmm
                  </li>
                  <br />
                  <li className="termcheckbox">
                    <input type={"checkbox"} required />
                    rrrr
                  </li>
                </ul>
                <br />
                <br />
                <button
                  className="btn"
                  type="submit"
                  style={{ marginLeft: "-80px" }}
                >
                  proceed
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div
            className="Container"
            style={{
              display: "flex",
              justifyContent: "space-around",
              backgroundColor: "lightskyblue",
              width: "100%",
              height: "600px",
            }}
          >
            <div
              className="subcontainer signup_form"
              style={{
                position: "absolute",
                backgroundColor: "whitesmoke",
                flexDirection: "column",
                boxShadow: "10px 10px  10px ",
                marginTop: "8%",
                height: "55%",
                width: "50%",
                fontSize: "20px",
              }}
            >
              <form
                className="signup_form"
                style={{ alignItems: "center", fontSize: "40px" }}
                onSubmit={action123}
              >
                <input
                  type="text"
                  className="input_box"
                  required
                  placeholder="Name"
                  value={values["name"]}
                  onChange={(e) => updatevalue(e, "name")}
                />
                <p style={{ display: "none" }}>The Name that given with YEP</p>
                <br />
                <input
                  type="text"
                  className="input_box"
                  required
                  value={values["email"]}
                  placeholder="E mail"
                  onChange={(e) => updatevalue(e, "email")}
                />
                <p style={{ display: "none" }}>
                  Email that you have given with YEP
                </p>
                <br />
                <select
                  value={batches.id}
                  required
                  className="drpdown_signup"
                  placeholder="select batch"
                  onChange={(e) =>
                    setbatch_id((p) => ({ ...p, batch_id: e.target.value }))
                  }
                >
                  <option hiddenvalue={"Select Batch"}>{"Select Batch"}</option>
                  {batches.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.name}
                    </option>
                  ))}
                </select>
                <br />
                <br />
                
                

                <button
                  type="submit"
                  style={{
                    marginTop: "30px",
                    maxWidth: "80%",
                    marginLeft: "75px",
                  }}
                  className="btn"
                >
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        )
      ) : (
        <>
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
            <h2 style={{ fontSize: "clamp(1rem,5vw,1.5rem)" }}>
              Don't have an account{" "}
              <a
                style={{ color: "green", textAlign: "center" }}
                onClick={() => setSighup(true)}
              >
                sign up
              </a>{" "}
            </h2>
          </form>
        </>
      )}
    </div>
  );
};

export default Login;
