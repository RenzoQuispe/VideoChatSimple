import pool from '../libs/db.js';

export const listarSalas = async (req, res) => {
    try {
        const resultado = await pool.query(
            'SELECT id, nombre, creado_por FROM salas ORDER BY creado_en DESC'
        );
        res.json(resultado.rows);
    } catch (error) {
        console.error('Error al listar salas:', error.message);
        res.status(500).json({ message: 'Error al obtener las salas' });
    }
};