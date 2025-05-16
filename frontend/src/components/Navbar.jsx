import { useState } from "react"
import { Link } from "react-router-dom"
const Navbar = () =>{
  const [isOpen,setIsOpen] = useState(false)
  return(
    <>
    <nav className="bg-blue-600 text-white flex justify-between items-center py-4 px-6">
        <h1 className="text-lg font-bold">TimeCue</h1>

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
      <ul className="hidden md:flex space-x-6 flex-1 justify-center">
        <li className="hover:text-blue-300 hover:cursor-pointer"><Link to="/">Home</Link></li>
        <li className="hover:text-blue-300 hover:cursor-pointer"><Link to="/set-reminder">Set Reminder</Link></li>
        <li className="hover:text-blue-300 hover:cursor-pointer"><Link to="/my-reminders">My Reminders</Link></li>
      </ul>

     <div className="gap-4 hidden md:flex">
      <button className="bg-white text-blue-600 px-4 py-2 rounded"><Link to="/login">Log In</Link></button>
      <button className="bg-blue-500 px-4 py-2 rounded"><Link to="/sign-up">Sign Up</Link></button>
     </div>
    </nav>


    {/* Mobile menu */}
    {isOpen && (
       <div className="md:hidden flex flex-col items-start space-y-4 mt-4 px-6 py-4 bg-blue-600 text-white shadow-md rounded transition-all duration-300">

          <ul className="space-y-2">
            <li className="hover:text-blue-300 cursor-pointer"><Link to="/">Home</Link></li>
            <li className="hover:text-blue-300 cursor-pointer"><Link to="/set-reminder">Set Reminder</Link></li>
            <li className="hover:text-blue-300 cursor-pointer"><Link to="/my-reminders">My Reminders</Link></li>       
          </ul>
          <div className="flex flex-col gap-2 mt-4 ">
            <button className="bg-white text-blue-600 px-4 py-2 rounded w-full">Log In</button>
            <button className="bg-blue-500 px-4 py-2 rounded w-full"><Link to="/sign-up">Sign Up</Link></button>
          </div>
        </div>
      )}
      </>
  )
}

export default Navbar


