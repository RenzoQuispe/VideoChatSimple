import bcrypt from 'bcryptjs';
import pool from '../libs/db.js';
import { createAccessToken } from "../libs/jwt_utils.js"

export const register = async (req, res) => {
    const { username, email, contraseña } = req.body;
    try {
        // Validaciones básicas
        if (!username || !email || !contraseña) {
            return res.status(400).json({ message: "username, email y contraseña son requeridos" });
        }

        if (contraseña.length < 6) {
            return res.status(400).json({ message: "La contraseña debe tener al menos 6 caracteres" });
        }

        // Verificar si el email ya está en uso
        const resultEmail = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        if (resultEmail.rows.length > 0) {
            return res.status(409).json({ message: 'Correo en uso' });
        }

        // Verificar si el username ya está en uso
        const resultUsername = await pool.query('SELECT * FROM usuarios WHERE username = $1', [username]);
        if (resultUsername.rows.length > 0) {
            return res.status(409).json({ message: 'Username en uso' });
        }

        // Hashear contraseña
        const hashedContraseña = await bcrypt.hash(contraseña, 10);

        // Insertar nuevo usuario
        const result = await pool.query(
            'INSERT INTO usuarios (username, email, contraseña) VALUES ($1, $2, $3) RETURNING *',
            [username, email, hashedContraseña]
        );
        const nuevoUsuario = result.rows[0];
        console.log("Nuevo usuario:", nuevoUsuario)
        console.log("id nuevo usuario:", nuevoUsuario.id)
        createAccessToken(nuevoUsuario.id, res);

        res.status(201).json({ result });
    } catch (err) {
        console.error('Error al registrar usuario:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
export const login = async (req, res) => {
    const { email, contraseña } = req.body;
    try {
        // buscar el usuario por su email
        const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No hay un usuario registrado con ese correo' });
        }
        const usuario = result.rows[0];
        // comparar contraseñas usando bcrypt
        console.log(usuario)
        console.log(contraseña)
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
    try {
        res.cookie('jwt_', '', {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            expires: new Date(0),
            maxAge: 0
        });
        res.status(200).json({ message: "Cerró cesión correactamente :D" });

    } catch (error) {
        console.log("Error logout", error.message);
        res.status(500).json({ message: "Server Error :/" });
    }

};
export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error checkAuth", error.message);
        res.status(500).json({ message: "Server Error" });
    }
};
