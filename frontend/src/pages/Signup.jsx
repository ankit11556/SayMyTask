import { useState } from "react"
import { userSignup } from "../services/AuthApi"

const Signup = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await userSignup({ email, password })
      alert(res.data.message)
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8 font-poppins">Signup to SayMyTask</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 rounded-lg hover:scale-105 transform transition-transform shadow-lg"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  )
}

export default Signup
