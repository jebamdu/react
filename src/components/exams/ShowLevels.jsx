import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavHead from "../NavHead";
import addBtn from "../../assets/addBtn.svg";
import axios from "../../instance/axios";

const ShowLevels = ({}) => {
  const [levelList, setLevelList] = useState([]);
  const [updatestate, setupdatestate] = useState(false);

  const takelevel = async () => {
    const val = await axios.get("/shown", {
      params: {
        level: null,
        type: null,
      },
    });
    console.log(val);
    return setLevelList(val.data);
  };
  useEffect(() => {
    takelevel();
  }, []);

  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState("");
  const show = () => {
    setShowPopup((p) => !p);
  };

  const popupSubmit = (e) => {
    e.preventDefault();
    show();
    insert();
  };

  const insert = async () => {
    const val = await axios.post("https://13.234.49.189/insert", {
      time: popupData, //send as name
      name: null,
    });
    console.log(val);
    if (val.status == 200) {
      console.log(val.data.status, "inserted rowid");
      return ShowLevels();
    }
  };
  const fun_add_name = (name) => {
    const val = localStorage.getItem("functionname");
    const value = JSON.parse(val);
    if (val >= 1) {
      console.log("hiii");
      const newvalue = value.slice(1);
      const items = [name];
      const newArray = [items].concat(newvalue);
      localStorage.setItem("functionname", JSON.stringify(newArray));
    } else {
      console.log("functionname", name);
      const items = [name];
      localStorage.setItem("functionname", JSON.stringify([items]));
    }
  };

  return (
    <div className="containerBody">
      <NavHead title="Question Bank" />
      <div className="wrapper">
        <div className="mainContainer">
          {showPopup && (
            <Popup
              data={popupData}
              submit={popupSubmit}
              setData={setPopupData}
              hide={show}
            />
          )}

          <div className="content">
            {levelList.map((l, i) => (
              <span
                style={{ display: "flex"}}
                key={i}
              >
                <Link className="levelstart" to={String(l.id)}>
                  <button
                    className="btn primary level"
                    onClick={() => fun_add_name(l.name)}
                  >
                    {l.name}
                  </button>
                </Link>
                <div
                  style={{ display: "flex", flexDirection: "row" }}
                  className="oprations"
                >
                  <Deletelevel name={l.name} id={l.id} />
                  <Updatelevel name={l.name} id={l.id} />
                </div>
              </span>
            ))}
            {
              <button
                className="btn primary popupbtn"
                style={{
                 
                  width: "200px",
                  marginLeft:"20%"
                  
                }}
                onClick={show}
              >
                Add
              </button>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

const Popup = ({ hide: hidecall, submit, setData, data }) => {
  const hide = (e) => {
    if (e.currentTarget === e.target) hidecall(e);
  };
  return (
    <div className="popContainer" onClick={hide}>
      <div className="popup center column">
        <form onSubmit={submit}>
          <div className="inputContainer">
            <label>Name : </label>
            <input
              value={data}
              onChange={(e) => setData(e.target.value)}
              type="text"
            />
          </div>
          <button type="submit" className="btn primary popupbtn">
            OK
          </button>
        </form>
      </div>
    </div>
  );
};

const Deletelevel = (id) => {
  const [showpopup, setshowpopup] = useState(false);
  const delfun = () => {
    setshowpopup(true)
    console.log(id, "from delete level");
  };
  const nofun=()=>{
    setshowpopup(false)
  }
  const yesfun=async()=>{
    console.log(id.id,"fromm yes");
    const call=await axios.get("/del_lev",{params:{"id":id.id}})
    if(call.data){
      setshowpopup(false)
    }
  
  }

  return (<span>{
    
    showpopup?(
      <div className="formcontainer">
        <div className="forminnercontainer" style={{alignItems:"center"}}>

          "Do You want to delete"
          <button onClick={yesfun}>Yes</button>
          <button onClick={nofun}>No</button>


        </div>
      </div>
    ):(
<svg
      width="50"
      height="35"
      onClick={delfun}
      viewBox="0 0 77 71"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.25 20.7084H16.0417V59.1667C16.0417 60.7359 16.7177 62.2409 17.9211 63.3505C19.1244 64.4601 20.7565 65.0834 22.4583 65.0834H54.5417C56.2435 65.0834 57.8756 64.4601 59.0789 63.3505C60.2823 62.2409 60.9583 60.7359 60.9583 59.1667V20.7084H19.25ZM32.0833 56.2084H25.6667V29.5834H32.0833V56.2084ZM51.3333 56.2084H44.9167V29.5834H51.3333V56.2084ZM53.3161 11.8334L48.125 5.91675H28.875L23.6839 11.8334H9.625V17.7501H67.375V11.8334H53.3161Z"
        fill="black"
      />
    </svg>

    )
    
    
    
    }
    
    









  </span>
   
  );
};

const Updatelevel = (id) => {
  const [showinnercomponent, setshowinnercomponent] = useState(false);
  const navigate= useNavigate()
  const [name, setname] = useState({ name: "" });
  const update = () => {
    console.log("update", id.name, id.id);
    setshowinnercomponent(true);
  };
  useEffect(() => {
   
    setname({ name: id.name });
  }, []);
  const updatecred = (e, field) => {
    e.preventDefault();
    setname((p) => ({ ...p, [field]: e.target.value }));
  };
  const updateroue = async (e) => {
    e.preventDefault();
    console.log(name,id,"this is id and name");
    const sol = await axios.post("/updatenameroute", {"name":name.name,"id":id.id});
    console.log(sol)
    if(sol.data){
      console.log("updated sucessfully");
      setshowinnercomponent(false)
      navigate("../exams")
      

    }
    else{
      alert("Not updated")
      setshowinnercomponent(false)
    }
  };
  return (
    <>
      {showinnercomponent ? (
        <div className="formcontainer">
          <div className="forminnercontainer">
            <form
              onSubmit={updateroue}
            >
              <input
                type="text"
                value={name.name}
                onChange={(e) => {
                  updatecred(e,"name");
                }}
              />

              <button type="submit">Update</button>
            </form>
          </div>
        </div>
      ) : (
        <svg
          width="40"
          height="35"
          viewBox="0 0 20 20"
          onClick={update}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 16C6 16.2652 6.10536 16.5196 6.29289 16.7071C6.48043 16.8946 6.73478 17 7 17H9.6C9.783 17.358 10.004 17.693 10.257 18H7C6.46957 18 5.96086 17.7893 5.58579 17.4142C5.21071 17.0391 5 16.5304 5 16V4C5 3.46957 5.21071 2.96086 5.58579 2.58579C5.96086 2.21071 6.46957 2 7 2H13C13.5304 2 14.0391 2.21071 14.4142 2.58579C14.7893 2.96086 15 3.46957 15 4V9.022C14.6673 8.99202 14.3327 8.99202 14 9.022V4C14 3.73478 13.8946 3.48043 13.7071 3.29289C13.5196 3.10536 13.2652 3 13 3H7C6.73478 3 6.48043 3.10536 6.29289 3.29289C6.10536 3.48043 6 3.73478 6 4V16ZM9.5 12.206C9.75062 11.6616 10.0884 11.1617 10.5 10.726V7.206L11.646 8.353C11.7399 8.44689 11.8672 8.49963 12 8.49963C12.1328 8.49963 12.2601 8.44689 12.354 8.353C12.4479 8.25911 12.5006 8.13178 12.5006 7.999C12.5006 7.86622 12.4479 7.73889 12.354 7.645L10.354 5.645C10.3076 5.59844 10.2524 5.56149 10.1916 5.53629C10.1309 5.51108 10.0658 5.49811 10 5.49811C9.93423 5.49811 9.86911 5.51108 9.80837 5.53629C9.74762 5.56149 9.69245 5.59844 9.646 5.645L7.646 7.645C7.59951 7.69149 7.56264 7.74668 7.53748 7.80742C7.51232 7.86816 7.49937 7.93326 7.49937 7.999C7.49937 8.06474 7.51232 8.12984 7.53748 8.19058C7.56264 8.25132 7.59951 8.30651 7.646 8.353C7.69249 8.39949 7.74768 8.43636 7.80842 8.46152C7.86916 8.48668 7.93426 8.49963 8 8.49963C8.06574 8.49963 8.13084 8.48668 8.19158 8.46152C8.25232 8.43636 8.30751 8.39949 8.354 8.353L9.5 7.207V12.206ZM19 14.5C19 15.6935 18.5259 16.8381 17.682 17.682C16.8381 18.5259 15.6935 19 14.5 19C13.3065 19 12.1619 18.5259 11.318 17.682C10.4741 16.8381 10 15.6935 10 14.5C10 13.3065 10.4741 12.1619 11.318 11.318C12.1619 10.4741 13.3065 10 14.5 10C15.6935 10 16.8381 10.4741 17.682 11.318C18.5259 12.1619 19 13.3065 19 14.5ZM16.854 12.646C16.8076 12.5994 16.7524 12.5625 16.6916 12.5373C16.6309 12.5121 16.5658 12.4991 16.5 12.4991C16.4342 12.4991 16.3691 12.5121 16.3084 12.5373C16.2476 12.5625 16.1924 12.5994 16.146 12.646L13.5 15.293L12.854 14.646C12.7601 14.5521 12.6328 14.4994 12.5 14.4994C12.3672 14.4994 12.2399 14.5521 12.146 14.646C12.0521 14.7399 11.9994 14.8672 11.9994 15C11.9994 15.1328 12.0521 15.2601 12.146 15.354L13.146 16.354C13.1924 16.4006 13.2476 16.4375 13.3084 16.4627C13.3691 16.4879 13.4342 16.5009 13.5 16.5009C13.5658 16.5009 13.6309 16.4879 13.6916 16.4627C13.7524 16.4375 13.8076 16.4006 13.854 16.354L16.854 13.354C16.9006 13.3076 16.9375 13.2524 16.9627 13.1916C16.9879 13.1309 17.0009 13.0658 17.0009 13C17.0009 12.9342 16.9879 12.8691 16.9627 12.8084C16.9375 12.7476 16.9006 12.6924 16.854 12.646Z"
            fill="black"
          />
        </svg>
      )}
    </>
  );
};

export default ShowLevels;
