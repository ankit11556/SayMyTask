import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import SetReminder from "../pages/SetReminder";
import MyReminders from "../pages/MyReminders";
import HeroSection from "../components/HeroSection";
const AppRouter = () =>{
  return(
 <Router>
<Navbar></Navbar>

<Routes>
  <Route path="/" element={<Home/>}></Route>
  <Route path="/set-reminder" element={<SetReminder/>}></Route>
  <Route path="/my-reminders" element={<MyReminders/>}></Route>
</Routes>
 </Router>
  )
}

export default AppRouter;