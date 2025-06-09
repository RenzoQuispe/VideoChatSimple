import { Link } from "react-router";
import { estadoAuth } from "../estados/estadoAuth";
const Navbar = () => {
    const { logout, authUser } = estadoAuth();
    return (

        <header className="top-0 w-[1100px] h-25 mx-auto bg-cover bg-center" >
            <div className="relative z-10 flex items-center justify-between px-6 h-full">
                <Link to="/" className="flex items-center justify-center w-[200px] font-bold bg-gray-200 hover:bg-blue-200 rounded-2xl px-2 py-2">
                    Home
                </Link>
                <Link to="/salas" className="flex items-center justify-center w-[200px] font-bold bg-gray-200 hover:bg-blue-200 rounded-2xl px-2 py-2">
                    Salas
                </Link>
                <Link to="/perfil" className="flex items-center justify-center w-[200px] font-bold bg-gray-200 hover:bg-blue-200 rounded-2xl px-2 py-2">
                    Perfil
                </Link>
                <Link to="/ajustes" className="flex items-center justify-center w-[200px] font-bold bg-gray-200 hover:bg-blue-200 rounded-2xl px-2 py-2">
                    Ajustes
                </Link>
                <Link onClick={logout} className="flex items-center justify-center w-[100px] font-bold bg-red-200 hover:bg-red-200 rounded-2xl px-2 py-2">
                    Logout
                </Link>
            </div>
        </header>
    )
}
export default Navbar;