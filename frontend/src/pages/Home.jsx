import { useEffect, useState } from "react"
import HeroSection from "../components/HeroSection"
import {getReminder} from "../services/Api"
const Home = () =>{

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
    <>
    <HeroSection></HeroSection>

    {reminders.map((reminder)=>{
      return <div>
        <p>{reminder.tasks}</p>
      </div>
    })}
    </>
  )
}

export default Home