import { estadoAuth } from "../estados/estadoAuth";
const Perfil = () => {
    const { authUser } = estadoAuth();
    return (
        <div>
            <img
                src={authUser.fotoperfil || "fotodefault.png"} //https://videochat.local/uploads/imagen.jpeg
                alt="Foto de perfil"
                className="w-32 h-32 rounded-full object-cover"
            />
            <div>ID: {authUser.id}</div>
            <div>username: {authUser.username}</div>
            <div>email: {authUser.email}</div>
            <div>Cuenta creada en: {authUser.creado_en}</div>
        </div>
    )
}
export default Perfil;