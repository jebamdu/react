import "./header.css";
import avatar from "../assets/user.png";
import logot from "../assets/logout.svg";
import { useNavigate } from "react-router-dom";
const Header = ({ user, login }) => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("logedin");
    localStorage.removeItem("levelarr");
    localStorage.removeItem("questionset")
    localStorage.removeItem("c_qus")

    navigate("/");
  };
  return (
    <div className={user?"header user-header":"user-header  header admin-header"}>
      <div className="left">
        <h1>
          Survey Tool
          {/* <span>program</span> */}
        </h1>
      </div>
      {!login && (
        <>
          <div className="right">
            <img tabIndex={0} src={avatar} alt="User Picture" />
            <span className="T-15 white">{user ? "USER" : "Admin"}</span>
            <div tabIndex={0} className="logout">
              <span onClick={() => navigate("changePassword")}>
                Change password
              </span>
              <img tabIndex={0} onClick={logout} src={logot} alt="logout" />
              <span>Logout</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
