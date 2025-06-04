import jwt from 'jsonwebtoken';
import pool from '../libs/db.js';

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt_;
    if (!token) {
      return res.status(401).json({ message: "Ruta no autorizada - No hay token :/" });
    }

    const tokenDecodificado = jwt.verify(token, process.env.JWT_SECRET);
    if (!tokenDecodificado) {
      return res.status(401).json({ message: "Ruta no autorizada - Token inválido :/" });
    }

    const userId = tokenDecodificado.userId;

    // Buscar al usuario en PostgreSQL por ID
    const result = await pool.query('SELECT id, username, email FROM usuarios WHERE id = $1', [userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Guardar los datos del usuario en req.user (sin contraseña)
    req.user = result.rows[0];
    
    next();

  } catch (error) {
    console.error("Error en protectRoute:", error.message);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
