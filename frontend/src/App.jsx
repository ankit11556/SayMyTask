import AppRouter from "./routes/AppRouter"
import { useAuth } from "./context/AuthContext";
function App() {
  const {loading} = useAuth();
  
    if(loading){
      return <p>Loading...</p>
    }
  return (
    <>
   <AppRouter></AppRouter>
    </>
  )
}

export default App
