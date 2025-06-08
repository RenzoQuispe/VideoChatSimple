import { useEffect } from "react";
import { estadoSalas } from "../estados/estadoSalas.js";

const ListaSalas = () => {
    const { Salas, listarSalas, isSalasLoading } = estadoSalas();

    useEffect(() => {
        listarSalas();
    }, []);

    return (
        <div>
            <h1>Salas disponibles</h1>
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
    )
}
export default ListaSalas;