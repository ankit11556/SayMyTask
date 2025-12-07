import AppRouter from "./routes/AppRouter"
import { useAuth } from "./context/AuthContext";
import LoadingPage from "./pages/LoadingPage";
function App() {
  const {loading} = useAuth();
  
    if(loading){
      return <LoadingPage></LoadingPage>
    }
  return (
    <div className="w-full h-screen m-0 p-0 justify-center items-center">
   <AppRouter></AppRouter>
    </div>
  )
}

export default App
