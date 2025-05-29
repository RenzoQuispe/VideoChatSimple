
import pool from '../libs/db.js';

export const register = async (req, res) => {
    const { username, email, contraseña } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO usuarios (username, email, contraseña) VALUES ($1, $2, $3) RETURNING *',
            [username, email, contraseña]
        );
        res.status(201).json({ "msg": "Creacion de usuario exitosa" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al registrar usuario' });
    }
};


