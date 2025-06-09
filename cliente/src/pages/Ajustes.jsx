import Navbar from "../componentes/Navbar";
const Ajustes = () => {
    return (
        <div className="flex flex-col items-center min-h-screen">
            <Navbar />
            <div className="border-2 border-blue-800 bg-white w-[1000px] h-[500px]">
                {/* Encabezado */}
                <div className="bg-blue-800 text-white px-4 py-2 text-2xl">Ajustes</div>
                
            </div>
        </div>

    )
}
export default Ajustes;