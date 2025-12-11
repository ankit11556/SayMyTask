import AppRouter from "./routes/AppRouter"
import { useAuth } from "./context/AuthContext";
import LoadingPage from "./pages/LoadingPage";
import Navbar from "./components/Navbar";
function App() {
  const {loading} = useAuth();
  
    if(loading){
      return <LoadingPage></LoadingPage>
    }
  return (
    <>
    <Navbar></Navbar>
    <div className="w-full h-screen m-0 p-0 justify-center items-center pt-[70px]">
   <AppRouter></AppRouter>
    </div>
    </>
  )
}

export default App
