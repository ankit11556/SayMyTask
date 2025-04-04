const Navbar = () =>{
  return(
    <nav className="bg-blue-600 text-white flex justify-between items-center py-4 px-6">
        <h1 className="text-lg font-bold">TimeCue</h1>

      <ul className="hidden md:flex space-x-6 flex-1 justify-center">
        <li className="hover:text-blue-300 hover:cursor-pointer">Home</li>
        <li className="hover:text-blue-300 hover:cursor-pointer">Set Reminder</li>
        <li className="hover:text-blue-300 hover:cursor-pointer">My Reminders</li>
      </ul>

     <div className="gap-4 flex">
      <button className="bg-white text-blue-600 px-4 py-2 rounded">Log In</button>
      <button className="bg-blue-500 px-4 py-2 rounded">Sign Up</button>
     </div>
    </nav>
  )
}

export default Navbar