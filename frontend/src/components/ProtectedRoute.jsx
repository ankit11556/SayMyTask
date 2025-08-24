import {Navigate,Outlet} from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import FadeLoader from "react-spinners/FadeLoader"

const ProtectedRoute = () =>{
 const {isAutheticated,loading} = useAuth()
  if(loading) return <div><FadeLoader/></div>
  return isAutheticated? <Outlet/>:<Navigate to="/login"/>
}

export default ProtectedRoute;