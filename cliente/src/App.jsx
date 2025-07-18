import { Route, Routes, Navigate } from "react-router";
// estetica
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast"
//Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage";
import Perfil from "./pages/Perfil";
import Ajustes from "./pages/Ajustes";
import ListaSalas from "./pages/ListaSalas";
//estados
import { estadoAuth } from "./estados/estadoAuth";
import { useEffect } from "react";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = estadoAuth();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  console.log({ authUser });

  // Loader 
  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div>
      <Routes>
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to='/login' />} />
        <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to='/' />} />
        <Route path='/register' element={!authUser ? <RegisterPage /> : <Navigate to='/' />} />
        <Route path='/perfil' element={authUser ? <Perfil /> : <Navigate to='/' />} />
        <Route path='/ajustes' element={authUser ? <Ajustes /> : <Navigate to='/' />} />
        <Route path='/salas' element={authUser ? <ListaSalas /> : <Navigate to='/' />} />
      </Routes>
      <Toaster />
    </div>
  )
}
export default App;