import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../instance/axios";


const ChangePassword = () => {

const navigate=useNavigate()

const email=localStorage.getItem("email")

const [credentials, setcredentials] = useState({phno:"",password:"",C_password:""});

const update=(e,field)=>{
    e.preventDefault()
    setcredentials((pre)=>({...pre,[field]: e.target.value})) 

}
const login = async(e) => {

    if(credentials.password===credentials.C_password){

    e.preventDefault()
    const solution=await axios.get("/isthere",{
        params:
        {
            phno:credentials.phno,
            password:credentials.password,
            

        }
    })
    console.log(solution.data);
    if(solution.data === 1){
        alert("Password is changed sucessfully")
    navigate('/user')
    }
    else{
        alert("Please Enter your valid phone number that you have enroll with YEP") 
       
    }

    }
    else alert(" you password is mismatched")
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