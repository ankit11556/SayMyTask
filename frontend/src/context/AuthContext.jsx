import { createContext, useContext, useEffect, useState } from "react";
import { userCheckAuth, userLogout } from "../services/AuthApi";
import {useNavigate} from "react-router-dom"

const AuthContext = createContext();

export const AuthProvider = ({children}) =>{

  const navigate = useNavigate()

  const [isAutheticated,setIsAutheticated] = useState(false);
  const [loading,setLoading] = useState(true);
  const [user,setUser] = useState(null)

  useEffect(()=>{
    const checkAuthStatus = async () => {
      try {
        const res = await userCheckAuth();
        setIsAutheticated(true);
        setUser(res.data.userId);
      } catch (error) {
        setIsAutheticated(false)
        setUser(null); 
         console.error("Check auth failed:", error);
      } finally{
        setLoading(false)
      }
    }
    checkAuthStatus()
  },[])

  const logout = async () => {
    try {
     const res = await userLogout();
      alert(res.data.message)
      setUser(null)
      setIsAutheticated(false)
      localStorage.removeItem('access_token')
      navigate("/login")
    } catch (error) {
      console.error("Logout failed", error);
      alert("Logout failed, please try again.");
    }
  }

  return(
    <AuthContext.Provider value={{isAutheticated,setIsAutheticated,loading,logout,user,setUser}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () =>useContext(AuthContext);