import { useState } from "react"

const UserProfile = () =>{

  const [name,setName] = useState("")
  const [language,setLanguage] = useState("")

  const handleSubmit = (e) =>{
    e.preventDefault()
    console.log(name,language);
    
  }
  return(
    <form onSubmit={handleSubmit}>
      <input type="text" 
      placeholder="Enter your name" 
      value={name}
      required
      onChange={(e)=>setName(e.target.value)}
      />

      <select value={language} onChange={(e) =>setLanguage(e.target.value)}>
        <option value="hindi">Hindi</option>
        <option value="english">English</option>
      </select>
      <button type="submit">Save</button>
    </form>
  )
}

export default UserProfile;