import {  useEffect, useState } from "react"
import { editReminder, postReminder, profileGet } from "../services/Api";
import {useNavigate} from "react-router-dom"
import { useLocation } from "react-router-dom";
import UserProfile from "./UserProfileForm";
import { useAuth } from "../context/AuthContext";
const SetReminder = () =>{

  const {user,setUser} = useAuth();
  const [showProfileForm,setShowProfileForm] = useState(true)
 
 const navigate = useNavigate()
 
 const location = useLocation()
 const isEditMode = location.state?.reminders || null;

  const [tasks,setTask] = useState("");
  const [date,setDate] = useState("");
  const [time,setTime] = useState("");
  const dateTime = `${date}T${time}`

  useEffect(()=>{
    const fetchUserProfile = async () => {
      try {
        const response = await profileGet();
        const [{name,language}] = response.data;
        setUser((prevUser) =>({
          ...prevUser,
          name,
          language
        }))
      } catch (error) {
        console.log("User profile fetch failed", err);
      };
    };

    if(!user.name || !user.language){
      fetchUserProfile()
    }
  },[])

  useEffect(()=>{
    setShowProfileForm(!(user.name && user.language));
  },[user])

 useEffect(()=>{
  if(isEditMode){
    setTask(isEditMode.tasks)  
    
   const localDateTime = new Date(isEditMode.dateTime);

      const dateStr = localDateTime.toISOString().slice(0, 10);
      setDate(dateStr);

      const timeStr = localDateTime.toTimeString().slice(0, 5);
      setTime(timeStr);
  }
 },[])
 
  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    if (isEditMode) {
      const response = await editReminder(isEditMode._id,{tasks,dateTime})
      alert(response.data.message)
    } else{
    const response = await postReminder({tasks,dateTime})
    alert(response.data.message)
    
    }
    navigate("/my-reminders")
  } catch (error) {
    alert(error.response?.data?.error)
  }
};

if (showProfileForm) {
  return <UserProfile onComplete={()=> setShowProfileForm(false)}/>
}
  
  return (
    <section className="bg-white p-6 max-w-xl mx-auto mt-6 rounded shadow">
  <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">Set Your Reminder</h2>

  <form onSubmit={handleSubmit} className="space-y-4">
    
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
    {isEditMode ? "Update Reminder" : "Set Reminder"}
    </button>
  </form>
</section>

  )
}

export default SetReminder