import { useState } from "react"
import { profileSave } from "../services/Api"
import { useAuth } from "../context/AuthContext"

const UserProfile = ({onComplete}) =>{

const {setUser} = useAuth()

  const [name,setName] = useState("")
  const [language,setLanguage] = useState("")

  const handleSubmit = async(e) =>{
    e.preventDefault()
   try {
    const response = await profileSave({name,language});
    alert(response.data.message)

    setUser((prev)=>({
      ...prev,
      name,
      language
    }))
    onComplete()
   } catch (error) {
    alert(error.response?.data?.message)
   }
    
  }
  return(
    <form onSubmit={handleSubmit} className="bg-white p-6 max-w-md mx-auto mt-10 rounded shadow space-y-4">
  <h2 className="text-2xl font-bold text-blue-700 mb-2 text-center">Complete Your Profile</h2>
  <p className="text-gray-600 text-center mb-4">
    To personalize your reminders, please enter your name and preferred language.
  </p>

  <div>
    <label className="block mb-1 text-blue-600 font-medium">Your Name</label>
    <input
      type="text"
      placeholder="Enter your name"
      value={name}
      required
      onChange={(e) => setName(e.target.value)}
      className="w-full border border-gray-300 rounded px-3 py-2"
    />
  </div>

  <div>
    <label className="block mb-1 text-blue-600 font-medium">Preferred Language</label>
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value)}
      required
      className="w-full border border-gray-300 rounded px-3 py-2"
    >
      <option value="">Select Language</option>
      <option value="hindi">Hindi</option>
      <option value="english">English</option>
    </select>
  </div>

  <button
    type="submit"
    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
  >
    Save & Continue
  </button>
</form>

  )
}

export default UserProfile;