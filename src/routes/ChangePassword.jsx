import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../instance/axios";


const ChangePassword = () => {

const navigate=useNavigate()

const email=localStorage.getItem("email")

const [credentials, setcredentials] = useState({password:"",C_password:"",current_pwd:""});

const update=(e,field)=>{
    e.preventDefault()
    setcredentials((pre)=>({...pre,[field]: e.target.value})) 

}
const login = async(e) => {
    e.preventDefault()
    const c_pwd_sus=await axios.get("/c_pwd_sus",{
        params:{
            email_id:email,
            c_pwd:credentials.current_pwd
        }
    })
    console.log(c_pwd_sus)
    if(c_pwd_sus.data)
    {
        
    if(credentials.password===credentials.C_password){
        console.log(email);

    e.preventDefault()
    const solution=await axios.get("/isthere",{
        params:
        {
            email_id:email,
            password:credentials.password,
            

        }
    })
    console.log(solution.data);
    if(solution.data === 1){
        alert("Password is changed sucessfully")
    navigate('/user')
    }
    

    }
    else alert(" your password is mismatched")
    }
    else{
        return alert("Your Current Password is Mismatched. Please check")
    }

}
    return (  


        <div className="changepwd">{
            login.data
        }
            <form onSubmit={login}>
            <label >Current Password</label>
            <input type="text" onChange={(e)=>(update(e,"current_pwd"))} value={credentials['current_pwd']} placeholder="Please enter"/>
            
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