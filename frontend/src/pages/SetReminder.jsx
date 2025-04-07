import {  useState } from "react"
import { postReminder } from "../services/Api";
import {useNavigate} from "react-router-dom"
const SetReminder = () =>{

 const navigate = useNavigate()
  const [userName,setUserName] = useState("");
  const [language,setLangage] = useState("");
  const [tasks,setTask] = useState("");
  const [date,setDate] = useState("");
  const [time,setTime] = useState("");
  const dateTime = `${date}T${time}`
 
  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await postReminder({userName,language,tasks,dateTime})
    alert(response.data.message)
    navigate("/my-reminders")
  } catch (error) {
    alert(error.response?.data?.error)
  }
}
  
  return (
    <section className="bg-white p-6 max-w-xl mx-auto mt-6 rounded shadow">
  <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">Set Your Reminder</h2>

  <form onSubmit={handleSubmit} className="space-y-4">
    
    <div>
      <label className="block text-blue-600 font-semibold mb-1">Username</label>
      <input type="text" placeholder="Enter your name" className="w-full border p-2 rounded" 
      value={userName}
      onChange={(e)=> setUserName(e.target.value)}
      />
    </div>

    <div>
      <label className="block text-blue-600 font-semibold mb-1">Language</label>
      <select className="w-full border p-2 rounded"
      value={language}
      onChange={(e)=> setLangage(e.target.value)}
      >
        <option value="">Select language</option>
        <option value="en">English</option>
        <option value="hi">Hindi</option>
        <option value="te">Telugu</option>
        <option value="zh">Chinese</option>
      </select>
    </div>

    <div>
      <label className="block text-blue-600 font-semibold mb-1">Reminder Task</label>
      <textarea placeholder="e.g. Attend meeting at 5 PM" className="w-full border p-2 rounded" rows="3"
      value={tasks}
      onChange={(e)=>setTask(e.target.value)}
      ></textarea>
    </div>

    <div>
      <label className="block text-blue-600 font-semibold mb-1">Date</label>
      <input type="date" className="w-full border p-2 rounded" 
      value={date}
      onChange={(e)=>setDate(e.target.value)}
      />
    </div>

    <div>
      <label className="block text-blue-600 font-semibold mb-1">Time</label>
      <input type="time" className="w-full border p-2 rounded" 
      value={time}
      onChange={(e)=>setTime(e.target.value)}
      />
    </div>

    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full">
      Set Reminder
    </button>
  </form>
</section>

  )
}

export default SetReminder