import { useRef, useState } from "react";
import Table from "../components/Table";
import axios from "../instance/axios";
import PopChart from "./PopChart";

const Viewscore=(props)=>{
    const [showtable, setshowtable] = useState();
    const [screening, setscreening] = useState(false);
    
    const [pop, setpop] = useState("");

    const email=localStorage.getItem("email")
    const lev_id=useRef(null)
   
    const templevel=props.data
    const level=templevel.slice(0,2);
    const tab=props.tab
   
    console.log(level)
    
    const newopen=async(id)=>{
        lev_id.current=id
        
        const usermark=await axios.get("/usermark",{params:{"id":id,"email":email}})
        setshowtable(eval(usermark.data));
        if(usermark.data){
            setscreening(true)
        }
       
    }
    // const showchart=async()=>{
    //     console.log(lev_id,"id is");
    //     const chartmark=await axios.get("/showchart",{params:{"id":lev_id.current,"email_id":email}})
    //     console.log(chartmark);
        
    //     setpop(email)
    // }
  


    return(
        <div className="fullpage" >
        <div className="sidecontainer_Viewscore">

            <div className="inner_Viewscore" >   
            
            <ul>
            {

        level.map(
            (e)=>(
                <li>
                <button key={e.id} value={e.id} onClick={()=>{newopen(e.id)}}>{e.name}</button>
                </li>
            )
            
        )


        }
        </ul>

        </div>
            
        {screening &&<>
        {/* <button className="View_history" onClick={()=>(showchart())}>View by history</button> */}
        <div className="View_container" onClick={()=>(tab(false))}>
        <div className="showtable_Viewscore"  onClick={()=>{setscreening(false)}}>
        <Table data={showtable}/>
        </div>
        </div>
        </> }
        <div className="popclass">
        {
         pop&&<PopChart
         email={pop}
         hidder={setpop}
         currentLevel={lev_id}
       />
     } 
     </div>  

        
         
        </div>
        </div>
    )
}
export default Viewscore