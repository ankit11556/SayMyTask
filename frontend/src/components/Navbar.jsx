import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaUserCircle } from "react-icons/fa";
import Logo from "../assets/logo.png";
import { useUserProfile } from "../context/UserProfileContext";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const { profile } = useUserProfile();

  const [profileOpen, setProfileIsOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    if (isOpen === true) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      <nav
        className={`bg-gradient-to-r from-blue-600 to-purple-600 text-white flex justify-between items-center py-3 px-6 md:px-16 font-poppins shadow-2xl`}
      >
        <div className="h-16 w-44 flex items-center gap-4">
          {/* Mobile icon */}
          <div
            className="md:hidden "
            aria-label="Toggle Menu"
            onClick={() => setIsOpen(!isOpen)}
          >
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </div>
          <img
            src={Logo}
            alt="SayMyTask Logo"
            className="h-full md:w-auto w-13 object-contain scale-150 "
          />
        </div>

        {/* desktop */}
        <ul className="hidden md:flex space-x-8 text-lg font-medium">
          <li className="hover:text-cyan-300 transition-colors duration-300">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-cyan-300 transition-colors duration-300">
            <Link to="/set-reminder">Set Reminder</Link>
          </li>
          <li className="hover:text-cyan-300 transition-colors duration-300">
            <Link to="/my-reminders">My Reminders</Link>
          </li>
        </ul>

        <div className="gap-4  md:flex">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setProfileIsOpen(!profileOpen)}
                className="flex items-center gap-1 px-2 py-1 bg-white text-indigo-600 rounded-lg shadow-md hover:bg-gray-100 transition  md:w-auto "
              >
                <FaUserCircle className="text-2xl" />
                <span className="text-sm md:text-lg">{profile?.name}</span>
                <svg
                  className="w-4 h-4 ms-1.5 -me-0.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 9-7 7-7-7"
                  />
                </svg>
              </button>

              {profileOpen && (
                <div className="absolute  mt-1 items-center bg-indigo-500 z-50 p-4 gap-3 flex flex-col rounded justify-center ">
                  <Link to="/profile">
                    <button className="bg-gradient-to-r  text-black bg-white px-2 py-1  shadow-md hover:scale-105 hover:brightness-110 transition-all duration-300 ml-2 rounded-md">
                      Profile
                    </button>
                  </Link>
                  <button
                    onClick={logout}
                    className="bg-gradient-to-r  bg-red-500 px-2 py-1 text-white shadow-md hover:scale-105 hover:brightness-110 transition-all duration-300  rounded-md"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button className="bg-white text-blue-600 md:px-4 px-3 py-2 rounded shadow hover:scale-105 transition-transform">
                <Link to="/login">Log In</Link>
              </button>
              <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded shadow hover:scale-105 transition-transform hidden md:flex">
                <Link to="/sign-up">Sign Up</Link>
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Mobile menu */}

      <div
        className={`md:hidden flex flex-col justify-between  px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-2xl  transition-all duration-300 h-[86vh] fixed top-0 left-0 z-10 w-3/5 max-w-xs lg:hidden ${
          isOpen ? "-translate-0" : "-translate-x-full"
        } mt-22`}
      >
        <ul className="space-y-4 ">
          <li className="hover:text-cyan-300 transition-colors duration-300 cursor-pointer">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-cyan-300 transition-colors duration-300 cursor-pointer">
            <Link to="/set-reminder">Set Reminder</Link>
          </li>
          <li className="hover:text-cyan-300 transition-colors duration-300 cursor-pointer">
            <Link to="/my-reminders">My Reminders</Link>
          </li>
        </ul>
        <button
          onClick={logout}
          className="bg-gradient-to-r  bg-red-500 px-4 py-1 text-white shadow-md hover:scale-105 hover:brightness-110 transition-all duration-300  rounded-md mb-5"
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default Navbar;
