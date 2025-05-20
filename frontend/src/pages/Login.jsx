import { useState } from "react"
import { userLogin } from "../services/AuthApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const Login = () =>{
  const[email,setEmail] = useState("");
  const[password,setPassword] = useState("")
 const navigate = useNavigate()

 const {setIsAutheticated,setUser} = useAuth()
  
  const handleSubmit = async(e) =>{
    e.preventDefault()
    try {
      const res = await userLogin({email,password})
      alert(res.data.message)
      setIsAutheticated(true)
      setUser(res.data)
      navigate("/set-reminder")
    } catch (error) {
      alert(error.response?.data?.message)
    }
  }
  return (
   <div className="max-w-md mx-auto mt-16 p-6 bg-white shadow-lg rounded-md">
  <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">Login</h2>
  <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
    <input
      type="email"
      placeholder="Enter email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
      className="border border-gray-300 rounded-md px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <input
      type="password"
      placeholder="Enter password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
      className="border border-gray-300 rounded-md px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button
      type="submit"
      className="bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition-colors"
    >
      Login
    </button>
  </form>
</div>

  )
}

export default Login