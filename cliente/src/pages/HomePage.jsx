import Navbar from "../componentes/Navbar";
const HomePage = () => {
    return (
        <div className="flex flex-col items-center min-h-screen ">
            <Navbar/>
            <div className="flex items-center justify-center font-bold text-3xl mt-25 bg-gray-100">[ ¡Bienvenido a VideoChatLocal! ]</div>
        </div>
    )
}
export default HomePage;