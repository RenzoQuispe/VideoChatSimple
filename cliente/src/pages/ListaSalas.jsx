import { useEffect, useState } from "react";
import { estadoSalas } from "../estados/estadoSalas.js";
import Navbar from "../componentes/Navbar.jsx";
import CrearSala from "../componentes/CrearSala.jsx";
const ListaSalas = () => {
    const { Salas, listarSalas, isSalasLoading, isCreandoSala, setIsCreandoSala } = estadoSalas();

    useEffect(() => {
        listarSalas();
    }, []);

    return (

        <div className="flex flex-col items-center min-h-screen" >
            <Navbar />
            {isCreandoSala ? (
                <CrearSala />
            ) : (
                <div className="border-2 border-blue-800 bg-white w-[1000px] h-[500px]">
                    {/* Encabezado */}
                    <div className=" bg-blue-800  px-4 py-2 flex items-center">
                        <label htmlFor="tipoBusqueda" className="text-2xl text-white mr-4">Salas</label>
                        <button
                            className="flex items-center justify-center w-[125px] bg-green-300 hover:bg-blue-200 rounded-2xl ml-190 px-2 py-1"
                            onClick={() => setIsCreandoSala(true)}
                        >
                            Crear sala
                        </button>
                    </div>
                    {/*Contenido */}
                    {isSalasLoading ? (
                        <p>Cargando salas...</p>
                    ) : (
                        <ul>
                            {Salas.map((sala) => (
                                <li key={sala.id}>
                                    {sala.nombre} — Creada por ID={sala.creado_por}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    )
}
export default ListaSalas;