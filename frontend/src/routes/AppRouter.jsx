import {Routes, Route} from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import SetReminder from "../pages/SetReminder";
import MyReminders from "../pages/MyReminders";
import VerifyEmail from "../pages/VerifyEmail";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ProtectedRoute from "../components/ProtectedRoute";
import UserProfile from "../pages/UserProfileForm";
const AppRouter = () =>{
  return(
 <>
<Navbar></Navbar>

<Routes>
  <Route path="/" element={<Home/>}></Route>
  <Route element={<ProtectedRoute/>}>
  <Route path="/set-reminder" element={<SetReminder/>}></Route>
  <Route path="/my-reminders" element={<MyReminders/>}></Route>
  <Route path="/user-profile" element={<UserProfile/>}></Route>
</Route>
  <Route path="/verify-email" element={<VerifyEmail/>}></Route>
  <Route path="/sign-up" element={<Signup/>}></Route>
  <Route path="/login" element={<Login/>}></Route>
</Routes>
 </>
  )
}

export default AppRouter;