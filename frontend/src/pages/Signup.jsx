import { useState } from "react"
import { userSignup } from "../services/AuthApi"

const Signup = () =>{
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  
  const handleSubmit = async(e) =>{
  e.preventDefault()
 try {
   const res = await userSignup({email,password})   
  alert(res.data.message)
  
 } catch (error) {
  alert(error.res?.data?.message)
 }
  }

  return(
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-lg rounded-md">
  <h2 className="text-3xl font-semibold mb-6 text-gray-800">Signup</h2>
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
      Signup
    </button>
  </form>
</div>


  )
}

export default Signup