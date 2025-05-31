import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import Logo from '../assets/logo.png'
const Navbar = () =>{
  const [isOpen,setIsOpen] = useState(false)
  const {user,logout} = useAuth()

  return(
    <>
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white flex justify-between items-center py-3 px-6 font-poppins shadow-md">

  <div className="h-16 w-44 flex items-center ">
  <img 
    src={Logo} 
    alt="SayMyTask Logo" 
    className="h-full w-auto object-contain scale-150 ml-10" 
  />
</div>


{/* Mobile icon */}
 <div className="md:hidden" aria-label="Toggle Menu" onClick={() => setIsOpen(!isOpen)}>

   {isOpen ? (
  // Close icon (X)
  <svg
    className="w-6 h-6 cursor-pointer"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
) : (
  // Hamburger icon
  <svg
    className="w-6 h-6 cursor-pointer"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
)}
  </div>
   
  {/* desktop */}
      <ul className="hidden md:flex space-x-8 text-lg font-medium">
       <li className="hover:text-cyan-300 transition-colors duration-300"><Link to="/">Home</Link></li>
       <li className="hover:text-cyan-300 transition-colors duration-300"><Link to="/set-reminder">Set Reminder</Link></li>
       <li className="hover:text-cyan-300 transition-colors duration-300"><Link to="/my-reminders">My Reminders</Link></li>
     </ul>


     <div className="gap-4 hidden md:flex">
      {user?(
        <button
             onClick={logout}
             className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full shadow-md hover:scale-105 hover:brightness-110 transition-all duration-300"
               >
               Logout
             </button>
        ):(
        <>
     <button className="bg-white text-blue-600 px-4 py-2 rounded shadow hover:scale-105 transition-transform"><Link to="/login">Log In</Link></button>
    <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded shadow hover:scale-105 transition-transform"><Link to="/sign-up">Sign Up</Link></button>
      </>
      )}
     </div>
    </nav>


    {/* Mobile menu */}
    {isOpen && (
       <div className="md:hidden flex flex-col items-start space-y-4 mt-4 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg rounded-md transition-all duration-300">

          <ul className="space-y-2">
            <li className="hover:text-cyan-300 transition-colors duration-300 cursor-pointer"><Link to="/">Home</Link></li>
            <li className="hover:text-cyan-300 transition-colors duration-300 cursor-pointer"><Link to="/set-reminder">Set Reminder</Link></li>
            <li className="hover:text-cyan-300 transition-colors duration-300 cursor-pointer"><Link to="/my-reminders">My Reminders</Link></li>       
          </ul>
          <div className="flex flex-col gap-2 mt-4 ">
            {user?(
              <button
               onClick={logout}
                className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full shadow-md hover:scale-105 hover:brightness-110 transition-all duration-300"
                  >
                 Logout
                 </button>
            ):(
              <>
            <button className="bg-white text-blue-600 px-4 py-2 rounded shadow hover:scale-105 transition-transform"><Link to="/login">Log In</Link></button>
           <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded shadow hover:scale-105 transition-transform"><Link to="/sign-up">Sign Up</Link></button>
            </>
            )}
          </div>
        </div>
      )}
      </>
  )
}

export default Navbar


