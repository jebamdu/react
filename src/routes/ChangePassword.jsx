import { useState } from "react";
import axios from "../instance/axios";


const ChangePassword = () => {

const email=localStorage.getItem("email")

const [credentials, setcredentials] = useState({email:"",phno:""});

const update=(e,field)=>{
    e.preventDefault()
    setcredentials((pre)=>({...pre,[field]: e.target.value})) 

}
const login = async(e) => {
    e.preventDefault()
    const solution=await axios.get("/isthere",{
        params:
        {
            email:email,
            phno:credentials.phno

        }
    })
    if(solution){console.log(solution.data)}


}
    return (  


        <div className="changepwd">{
            login.data
        }
            <form onSubmit={login}>
            <label >Phone Number:</label>
            <input type="text" onChange={(e)=>(update(e,"phno"))} value={credentials['phon']} placeholder="Please enter" />
            <br /><br /><label >New password</label>
            <input type="text" onChange={(e)=>(update(e,"password"))} value={credentials['password']} placeholder="Please enter" />
            <br /><br /><label >Conform password</label>
            <input type="text" onChange={(e)=>(update(e,"C_password"))} value={credentials['C_password']} placeholder="Please enter" />
            <br /><br /><button type="submit">Submit</button>
            </form>

        </div>
    );
}
 
export default ChangePassword;