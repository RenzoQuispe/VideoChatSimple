import bcrypt from 'bcryptjs';
import pool from '../libs/db.js';

export const register = async (req, res) => {
    const { username, email, contraseña } = req.body;
    // falta validacion y encriptacion
    try {
        const hashedContraseña = await bcrypt.hash(contraseña,10);
        const result = await pool.query(
            'INSERT INTO usuarios (username, email, contraseña) VALUES ($1, $2, $3) RETURNING *',
            [username, email, hashedContraseña]
        );
        res.status(201).json({ "msg": "Creacion de usuario exitosa" });
    } catch (err) {
        console.error('Error al registrar usuario',err);
        res.status(500).json({ error: 'Error al registrar usuario' });
    }
};
export const actualizar = async (req, res) => {
    const { username, constraseña } = req.body;
    try {

    } catch (err) {
        res.status(500).json({error: 'Error al actualizar datos'})
    }

}


