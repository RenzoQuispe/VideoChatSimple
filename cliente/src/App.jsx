import {Route, Routes, Navigate} from "react-router";
import {Toaster} from "react-hot-toast"
//Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage";

const App = () => {
  return(
    <div>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
      </Routes>
      <Toaster/>
    </div>
  )
}
export default App;