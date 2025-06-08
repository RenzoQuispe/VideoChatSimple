import { estadoAuth } from "../estados/estadoAuth";
const Perfil = () => {
    const {authUser} = estadoAuth();
    return(
        <div>
            <div>{authUser.id}</div>
            <div>{authUser.username}</div>
            <div>{authUser.email}</div>
            <div>{authUser.fotoperfil}</div>
            <div>{authUser.creado_en}</div>
        </div>
    )
}
export default Perfil;