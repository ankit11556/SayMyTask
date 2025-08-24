import AppRouter from "./routes/AppRouter"
import { useAuth } from "./context/AuthContext";
import LoadingPage from "./pages/LoadingPage";
function App() {
  const {loading} = useAuth();
  
    if(loading){
      return <LoadingPage></LoadingPage>
    }
  return (
    <>
   <AppRouter></AppRouter>
    </>
  )
}

export default App
