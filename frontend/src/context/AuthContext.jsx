import { createContext, useContext, useEffect, useState } from "react";
import { userCheckAuth } from "../services/AuthApi";

const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
  const [isAutheticated,setIsAutheticated] = useState(false);
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    const checkAuthStatus = async () => {
      try {
        await userCheckAuth();
        setIsAutheticated(true);
      } catch (error) {
        setIsAutheticated(false)
      } finally{
        setLoading(false)
      }
    }
    checkAuthStatus()
  },[])

  return(
    <AuthContext.Provider value={{isAutheticated,setIsAutheticated,loading}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () =>useContext(AuthContext);