import bcrypt from 'bcryptjs';
import pool from '../libs/db.js';
import { createAccessToken } from "../libs/jwt_utils.js"

export const register = async (req, res) => {
    const { username, email, contraseña } = req.body;
    try {
        const hashedContraseña = await bcrypt.hash(contraseña, 10);
        const result = await pool.query(
            'INSERT INTO usuarios (username, email, contraseña) VALUES ($1, $2, $3) RETURNING *',
            [username, email, hashedContraseña]
        );
        res.status(201).json({ "msg": "Creacion de usuario exitosa" });
    } catch (err) {
        console.error('Error al registrar usuario', err);
        res.status(500).json({ error: 'Error al registrar usuario' });
    }
};
export const actualizarUsuario = async (req, res) => {
    const { id } = req.params;
    const { username, contraseña } = req.body;

    try {
        const userResult = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);

        if (userResult.rowCount === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const usuarioActual = userResult.rows[0];
        console.log('Usuario actual:', usuarioActual);

        // hashear la nueva contraseña
        const hashedcontraseña = await bcrypt.hash(contraseña, 10);

        // verificar si hay cambios
        const mismoUsername = usuarioActual.username === username;
        const mismacontraseña = await bcrypt.compare(contraseña, usuarioActual.contraseña); // compara con la hash actual

        if (mismoUsername && mismacontraseña) {
            return res.status(200).json({ message: 'No se realizaron cambios. Los datos son los mismos.' });
        }

        // 4. Actualizar solo si hay cambios
        const result = await pool.query(
            'UPDATE usuarios SET username = $1, contraseña = $2 WHERE id = $3 RETURNING id, username',
            [username, hashedcontraseña, id]
        );

        console.log('Usuario actualizado:', result.rows[0]);

        res.json({ message: 'Usuario actualizado correctamente', usuario: result.rows[0] });
    } catch (err) {
        console.error('Error al actualizar usuario:', err);
        res.status(500).json({ message: 'Error del servidor' });
    }
};
export const login = async (req, res) => {
    const { email, contraseña} = req.body;
    try {
        // buscar el usuario por su email
        const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No hay un usuario registrado con ese correo' });
        }
        const usuario = result.rows[0];
        // comparar contraseñas usando bcrypt
        const match = await bcrypt.compare(contraseña, usuario.contraseña);

        if (!match) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        createAccessToken(usuario.id, res);
        res.status(200).json({
            id: usuario.id,
            username: usuario.username,
            email: usuario.email,
            fotoperfil: usuario.fotoperfil
        });

    } catch (error) {
        console.log("Error login", error.message);
        res.status(500).json({ message: "Server Error" });
    }

};
export const logout = (req, res) => {

};

