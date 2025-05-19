import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
  const [isAutheticated,setIsAutheticated] = useState(false)

  useEffect(()=>{
    const token = document.cookie.includes("access_token");
    setIsAutheticated(token)
  },[])

  return(
    <AuthContext.Provider value={{isAutheticated,setIsAutheticated}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () =>useContext(AuthContext);