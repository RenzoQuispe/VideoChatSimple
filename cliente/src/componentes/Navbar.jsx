import { Link } from "react-router";
import { estadoAuth } from "../estados/estadoAuth";
const Navbar = () => {
    const {logout, authUser} = estadoAuth();
    return (
        <div className="flex gap-10 mt-5 ml-5 border-1">
            <Link to="/" className="w-[150px] font-bold bg-gray-200 hover:bg-blue-200 rounded-2xl px-2 py-2">
                Home
            </Link>
            <Link to="/salas" className="w-[150px] font-bold bg-gray-200 hover:bg-blue-200 rounded-2xl px-2 py-2">
                Salas Disponibles
            </Link>
            <Link to="/perfil" className="w-[150px] font-bold bg-gray-200 hover:bg-blue-200 rounded-2xl px-2 py-2">
                Perfil
            </Link>
            <Link to="/ajustes" className="w-[150px] font-bold bg-gray-200 hover:bg-blue-200 rounded-2xl px-2 py-2">
                Ajustes
            </Link>
            <Link onClick={logout} className="w-[100px] font-bold bg-red-200 hover:bg-red-200 rounded-2xl px-2 py-2">
                Logout
            </Link>
        </div>
    )
}
export default Navbar;