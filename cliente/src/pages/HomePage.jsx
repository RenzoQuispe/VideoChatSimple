import { useState } from "react";
import Perfil from "./Perfil";
import Ajustes from "./Ajustes";
import ListaSalas from "../componentes/ListaSalas";
import CrearSala from "../componentes/CrearSala";
const HomePage = () => {
    const [Componente, SetComponente] = useState("listaSalas") // listaSalas, perfil, ajustes
    return (
        <div>
            {/*Barra de navegacion */}
            <div className="flex gap-5 mt-5 ml-5">
                <button
                    className="w-[150px] font-bold bg-gray-200 hover:bg-blue-200 rounded-2xl px-2 py-2"
                    onClick={() => SetComponente("CrearSala")}>
                    Crear Sala
                </button>
                <button
                    className="w-[150px] font-bold bg-gray-200 hover:bg-blue-200 rounded-2xl px-2 py-2"
                    onClick={() => SetComponente("listaSalas")}>
                    Salas Disponibles
                </button>
                <button
                    className="w-[150px] font-bold bg-gray-200 hover:bg-blue-200 rounded-2xl px-2 py-2"
                    onClick={() => SetComponente("perfil")}>
                    Perfil
                </button>
                <button
                    className="w-[150px] font-bold bg-gray-200 hover:bg-blue-200 rounded-2xl px-2 py-2"
                    onClick={() => SetComponente("ajustes")}>
                    Ajustes
                </button>
            </div>
            {/*componentes cargado dependiente del useState */}
            <div className="border-1 ml-5 mt-5">
                {Componente==="CrearSala" && <CrearSala/>}
                {Componente === "perfil" && <Perfil />}
                {Componente === "ajustes" && <Ajustes />}
                {Componente === "listaSalas" && <ListaSalas />}
            </div>
        </div>
    )
}
export default HomePage;