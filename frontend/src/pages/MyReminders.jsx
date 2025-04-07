import { useEffect, useState } from "react"
import {getReminder} from "../services/Api"
const MyReminders = () =>{
  const [reminders,setReminders] = useState([])
    const fetch = async () => {
      try {
        const response = await getReminder()
        setReminders(response.data);
      } catch (error) {
        console.log(error.response?.data?.error);
      }  
    }
  
    useEffect(()=>{
      fetch()
    },[])
  return(
    <div className="max-w-3xl mx-auto p-4">
    <h2 className="text-2xl font-bold text-blue-700 mb-4">My Reminders</h2>

    {reminders.length === 0 ? (
      <p className="text-gray-600">No reminders found.</p>
    ) : (
      <ul className="space-y-4">
        {reminders.map((reminder, index) => (
          <li key={index} className="bg-white shadow-md p-4 rounded border border-blue-100">
            <p className="text-blue-700 font-semibold">{reminder.tasks}</p>
            <p className="text-gray-500 text-sm">
              {new Date(reminder.dateTime).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    )}
  </div>
  )
}
export default MyReminders