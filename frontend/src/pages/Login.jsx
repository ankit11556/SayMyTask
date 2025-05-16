import { useState } from "react"
import { userLogin } from "../services/AuthApi";
import { useNavigate } from "react-router-dom";
const Login = () =>{
  const[email,setEmail] = useState("");
  const[password,setPassword] = useState("")
 const navigate = useNavigate()
  
  const handleSubmit = async(e) =>{
    e.preventDefault()
    try {
      const res = await userLogin({email,password})
      alert(res.data.message)
      navigate("/set-reminder")
    } catch (error) {
      alert(error.res?.data?.message)
    }
  }
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" 
        placeholder="Enter email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        />

        <input type="password" 
        placeholder="Enter password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login