import "./exams.css";
import Table from "./Table";
import Question from "./exams/Question";


import axios from "../instance/axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import addBtn from "../assets/addBtn.svg";
import { useRef } from "react";
import { Innerinput } from "../routes/Addnewsection";




const  Exams = () => {
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();
  const { levelID,catID,inner_catid } = useParams();
  console.log(levelID, catID,"values");

  
  const [name, setname] = useState([]);
  
  const [deletefunctioncall, setdeletefunctioncall] = useState(false);
  const functionname1 =localStorage.getItem("functionname")
  const functionname2=JSON.parse(functionname1)
  const [Openupdate, setOpenupdate] = useState(false);
  const update=useRef(0)
  const delid=useRef(0)
  console.log(functionname1,"this is functionnnaeme");

  const newfunction=()=>{
   
    setname(functionname2)
   
  }
  const fetch = async () => {

    if(inner_catid){
      const  data  = await axios.get("/showncall", {
        params: {
          
          type: inner_catid,
        },
      });
      console.log(data.data);
    setExams(data.data);
    }
    else{
      const { data } = await axios.get("/shown", {
        params: {
          level: levelID,
          type: catID,
          innercat:inner_catid
        },
      });
      console.log(data);
    setExams(data);
    newfunction()
    }
   
   
    
  }


  
  useEffect(() => {
    update.current=0;
    if (inner_catid) addQus();
    fetch();
  }, [levelID, catID,inner_catid]);

 




  const addQus = async () => {
    //navigate(`/admin/createExam/${levelID}/${catID}`);
  };
  console.log("exams", exams);
  const [showpopup, setshowpopup] = useState(false);
  const [popData, setpopData] = useState("");

  const inserting = async () => {
    // const jsonobj={ name: popData,
    //     id: levelID,
    //     time: "null",
    //     catid:catID}
    //     console.log(jsonobj);
    // const val=await fetch("https://13.234.49.189/insert", {
    //   method: 'POST',body: JSON.stringify(jsonobj)
      
    // }).then(response=>{return response.text()}).then()
    const val = await axios.post("/insert", {
      name: popData,
      id: levelID,
      time: null,
      catid:catID
    });
    console.log(val);
    if(val){
      
    alert("inserted sucessfully")
     
    }
  };

  const popupSubmit = (e) => {
    e.preventDefault();
    show();
    console.log(popData);
    inserting();
  };

  const show = () => {
    setshowpopup((p) => !p);
  };
  const addelement = () => {
    navigate(`/admin/createExam/${levelID}/${inner_catid}`);
  };
  const newfunction2=(name)=>{
    console.log(name,"second name");
    const val=localStorage.getItem("functionname")
    const value=JSON.parse(val)
    if(value.length>=2 ){
      const data = value.splice(0, 1);
      data.push([name])
      console.log(data);
      setname(data)
      console.log("This is workinng");
      console.log(data,"data of 2nd one");
      localStorage.setItem("functionname",JSON.stringify(data))
    }else{
      value.push([name])
      console.log(value,"data second value");
      localStorage.setItem("functionname",JSON.stringify(value))
      setname(value)
    }

  }
  console.log(name);  
  const deleteroute=(id)=>{
    console.log(id);
    delid.current=id;
    setdeletefunctioncall(true)
    console.log(deletefunctioncall);
    
  }
  const deletecall=async()=>{
    const val=await axios.post("/delinnercontainer",{"id":delid.current})
    console.log(val);
    if (val.data){
      alert("deleted sucessfully")
      setdeletefunctioncall(false)
      navigate(`/admin/exams/${levelID}/${catID}`)
      delid.current=0
    }
    else{
      alert("Something went problem")
      setdeletefunctioncall(false) 
      navigate(`/admin/exams/${levelID}/${catID}`)
      delid.current=0
    }
  }
    
  console.log(deletefunctioncall);

  return (
    <>
    {  deletefunctioncall&&<div className="deletefunction">

      <div className="deletefuncenter">
        <h1>Do you want to delete</h1>
        <br />
        <div><button  className="btn primary btn-text" onClick={()=>(deletecall(delid))}>yes</button>
        <button  className="btn primary btn-text" onClick={()=>{setdeletefunctioncall(false); delid.current=0}}>No</button></div>
        
      </div>

    </div> }
   

      <h1 className="heading">

        {" "}
        {/*FRAGMENT*/}
        <Link to="/admin/exams">Exams</Link>
        {levelID && (
          <>
            {" > "}
            <Link to={`/admin/exams/${levelID}`}>{name[0]}</Link>
          </>
        )}
        {catID && (
          <>
            {" > "}
            <Link to={`/admin/exams/${levelID}/${catID}`}>{name[1]}</Link>
          </>
        )}
      
      </h1>
      
      <div className="maincontainer">
       
        {showpopup && (
          <Popup
            data={popData}
            setdata={setpopData}
            submit={popupSubmit}
            hide={show}
          />
        )}
         {
         catID&& <button class="btn newtype"onClick={()=>(navigate(`/admin/createExam/${catID}/newtype`))}>add new type</button>
        }
        {inner_catid? (
          <button className="btn primary btn-text" onClick={addelement}>
            Add more
          </button>
        ) : (
          <img
            className="addBtn"
            onClick={show}
            src={addBtn}
            alt="add button"
          />
        )}
        <div className="exams ">
          
          {Openupdate&&<div className="innercomponent" style={{position:"absolute",backgroundColor:"white"}}><Innerinput  updateValue={exams} value={update} /> </div>           
          }
          {!Openupdate&&inner_catid? (
            // <Table data={exams} />
            <div className="content " >
              {exams.map(
                (d, i) => (
                  // <Link to={String(d.id)}>
                  <>
                  <div key={i} className="btn primary flex-row jc-sb" onClick={()=>(setOpenupdate(true),update.current=i)}>
                    <div className="flex-column">
                      <div className=" fs-20 card-title">Question</div>
                      <div className="fs-20" dangerouslySetInnerHTML={{ __html: d.ques.replace(/â€™/g, "'")}}></div>
                    </div>
                    
                    {eval(d.ans)?.map((option, i) => (
                      <div className="flex-column" key={i}>
                        <div className=" fs-20 card-title">Option {i + 1}</div>
                        <div
                          className="fs-20"
                          style={
                            i === d.Correctans - 1
                              ? { backgroundColor: "#e342428c" }
                              : {}
                          }
                        >
                          {option}
                        </div>
                      </div>
                    ))}
                    <div className="flex-column">
                      <div className=" fs-20 card-title">Time</div>
                      <div className="fs-20">{d.time}</div>
                    </div>
                    
                  </div>
                  
                  <Deletelevel name={d.ques} id={d.id} inner_catid={"innercat"}/>  
                  </>
                  
                )
                // </Link>
              )}
            </div>
          ) : (catID?(
            <div className="div">{
              exams.map((l, i) => (
                <>
                <div >
                <Link key={i} to={String(l.id)}>
                  <button className="btn primary" style={{width:"300px"}} >{l.name}</button>
                  
                    
                </Link>
                <svg
      width="50"
      height="35"
      onClick={()=>{deleteroute(l.id)}}
      viewBox="0 0 77 71"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.25 20.7084H16.0417V59.1667C16.0417 60.7359 16.7177 62.2409 17.9211 63.3505C19.1244 64.4601 20.7565 65.0834 22.4583 65.0834H54.5417C56.2435 65.0834 57.8756 64.4601 59.0789 63.3505C60.2823 62.2409 60.9583 60.7359 60.9583 59.1667V20.7084H19.25ZM32.0833 56.2084H25.6667V29.5834H32.0833V56.2084ZM51.3333 56.2084H44.9167V29.5834H51.3333V56.2084ZM53.3161 11.8334L48.125 5.91675H28.875L23.6839 11.8334H9.625V17.7501H67.375V11.8334H53.3161Z"
        fill="black"
      />
    </svg>
    <Updatelevel name={l.name} id={l.id} innercat={"innercategory"}/>
    
               
                </div>
                </>
              ))



            }
                  
            </div>
          ):(exams.map((l, i) => (
            <>
            <div >
            <Link key={i} to={String(l.id)}>
              <button className="btn primary" style={{width:"300px"}} onClick={()=>(newfunction2(l.name))}>{l.name}</button>
                
            </Link>
            <Deletelevel name={l.name} id={l.id} />
            <Updatelevel name={l.name} id={l.id} />
            </div>
            </>
          )))
            
          )}
        </div>
        
      </div>
    </>
  );
};


export const Deletelevel=(id)=>{
  const [showpopup, setshowpopup] = useState(false);
  const navigate=useNavigate()
  const delfun = () => {
    setshowpopup(true)
    console.log(id, "from delete level");
  };
  const yesfun=async()=>{
    
    if(id.deltrainer){
      const val=await axios.post("/deltrainer",{"id":id.id})
      if(val.data){
        alert("deleted Sucessfully")
        
        setshowpopup(false)
        window.location.reload()
  
      }
      else{
        alert("something went wrong")
        window.location.reload()
      }
    }
    else if(id.batches){
      const val=await axios.post("/deletebathesid",{"id":id.id})
      if(val.data){
        alert("deleted Sucessfully")
        
        setshowpopup(false)
        window.location.reload()
  
      }
      else{
        alert("something went wrong")
        window.location.reload()
      }
    }
    else if(id.delques){
      const val=await axios.post("/deleteques2",{"id":id.id})
      if(val.data){
        alert("deleted Sucessfully")
        navigate("/admin/exams/")
        setshowpopup(false)
  
      }
      console.log("yes button is worked");
    }
    else if(id.inner_catid){
      const val=await axios.post("/deleteinnercat",{"id":id.id})
      if(val.data){
        alert("deleted Sucessfully")
        navigate("/admin/exams/")
        setshowpopup(false)
  
      }
      console.log("yes button is worked");

    }
    else{
      const val= await axios.post("/dellevel",{"id":id.id})
    if(val.data){
      alert("deleted Sucessfully")
      navigate("/admin/exams/")
      setshowpopup(false)

    }
    console.log("yes button is worked");
    }
    
  }
  const nofun=()=>{
    setshowpopup(false)
    navigate(`/admin/exams/${id.id}`)
    
  }
  return(<span>{
    
    showpopup?(
      <div className="formcontainer" style={{alignItems:"center"}}>
        <div className="forminnercontainer" style={{alignItems:"center",backgroundColor:"whitesmoke", display:"flex",alignItems:"center",flexDirection:"column",justifyContent:"center",color:"black"}}>

          "Do You want to delete"

          <div>
            <br />
            <h1 style={{color:"red"}}>{id.name}</h1>
          </div>
          <br />
          <div>
          <button className="btn btn-primary" onClick={yesfun}>Yes</button>
          <button className="btn btn-primary" onClick={nofun}>No</button>
          </div>
          


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
   )

}


export const Updatelevel = (id) => {
  const [showinnercomponent, setshowinnercomponent] = useState(false);
  const innercat=useRef(false)
  const navigate= useNavigate()
  const [name, setname] = useState({ name: "" });
  const update = () => {
    console.log("update", id.name, id.id);
    setshowinnercomponent(true);
    setname({ name: id.name });
  };
  useEffect(() => {
   
    setname({ name: id.name });
    if(id.innercat){
      setname({ "name": id.name });
      console.log(id.name);
      innercat.current=true
      console.log("This is working");
    }
  }, []);
  const updatecred = (e, field) => {
    e.preventDefault();
    setname((p) => ({ ...p, [field]: e.target.value }));
  };
  const updateroue = async (e) => {
    e.preventDefault();
    console.log(name,id,"this is id and name");
    if(id.innercat){
      console.log("This is noww working")
      const sol = await axios.post("/updatecategory", {"name":name.name,"id":id.id});
     
      console.log(id)

      if(sol.data){
        console.log("updated sucessfully");
        setshowinnercomponent(false)
        navigate(`../exams/${id.id}`)
        
  
      }
      else{
        alert("Not updated")
        setshowinnercomponent(false)
      }
      
    }
    else{
      const sol = await axios.post("/updatelevname", {"name":name.name,"id":id.id});
      console.log(sol)
      if(sol.data){
        console.log("updated sucessfully");
        setshowinnercomponent(false)
        navigate(`../exams/${id.id}`)
        
  
      }
      else{
        alert("Not updated")
        setshowinnercomponent(false)
      }
    }
    
   
  }
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


const Popup = ({ hide: hidecall, submit, setdata, data }) => {
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
              onChange={(e) => setdata(e.target.value)}
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

export default Exams;
