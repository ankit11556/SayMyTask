import { Link } from "react-router-dom"
 const HeroSection = () =>{
  return(
    <section className="bg-blue-100 py-20 px-6 text-center m-3">
    <h2 className="text-3xl font-bold text-blue-700 mb-4">Welcome to TimeCue</h2>
    <p className="text-lg text-blue-600 mb-6">Your personal voice reminder assistant</p>
    <p className="text-md text-blue-600 mb-2">Set personalized reminders that speak to you in your voice</p>
    <button className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"><Link to="/set-reminder">Set a Reminder</Link></button>
  </section>                                         
   
  )
}

export default HeroSection