import {Navigate,Outlet} from "react-router-dom"
const ProtectedRoute = () =>{
  const isLoggedIn = !!document.cookie.includes("access_token");

  return isLoggedIn ? <Outlet/>:<Navigate to="/login"/>
}

export default ProtectedRoute;