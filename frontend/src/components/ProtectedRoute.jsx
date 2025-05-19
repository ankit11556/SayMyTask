import {Navigate,Outlet} from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const ProtectedRoute = () =>{
 const {isAutheticated,loading} = useAuth()
  if(loading) return <p>Loading...</p>;
  return isAutheticated? <Outlet/>:<Navigate to="/login"/>
}

export default ProtectedRoute;