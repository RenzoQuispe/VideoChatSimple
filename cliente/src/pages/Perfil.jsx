import { estadoAuth } from "../estados/estadoAuth";
import Navbar from "../componentes/Navbar";
const Perfil = () => {
    const { authUser } = estadoAuth();
    return (
        <div className="flex flex-col items-center min-h-screen" >
            <Navbar />
            <div className="border-2 border-blue-800 bg-white w-[1000px] h-[500px]">
                {/* Encabezado */}
                <div className="bg-blue-800 text-white px-4 py-2 text-2xl">Perfil</div>
                {/*Contenido */}
                <div className="w-[300px] ml-105 mt-15">
                    <img
                        src={authUser.fotoperfil || "fotodefault.png"}
                        alt="Foto de perfil"
                        className="w-32 h-32 rounded-full object-cover mb-5"
                    />
                    <div>ID: {authUser.id}</div>
                    <div>Username: {authUser.username}</div>
                    <div>Email: {authUser.email}</div>
                    <div>Cuenta creada en: {authUser.creado_en}</div>
                </div>
            </div>
        </div>

    )
}
export default Perfil;