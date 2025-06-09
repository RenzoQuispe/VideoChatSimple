import { estadoSalas } from "../estados/estadoSalas";
const CrearSala = () => {
    const { setIsCreandoSala } = estadoSalas()
    return (
        <div className="flex flex-col items-center min-h-screen" >
            <div className="border-2 border-blue-800 bg-white w-[1000px] h-[500px]">
                {/* Encabezado */}
                <div className=" bg-blue-800  px-4 py-2 flex items-center">
                    <label htmlFor="tipoBusqueda" className="text-2xl text-white">Crear sala</label>
                    <button
                        className="flex items-center justify-center w-[125px] bg-red-200 hover:bg-blue-200 rounded-2xl ml-180 px-2 py-1"
                        onClick={() => setIsCreandoSala(false)}
                    >
                        Cancelar
                    </button>
                </div>
                {/*Contenido */}

            </div>
        </div>
    )
}
export default CrearSala;