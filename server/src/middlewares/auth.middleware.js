import jwt from 'jsonwebtoken';
import pool from '../libs/db.js';

export const protectRoute = async (req, res, next) => {
  try {
    
    const token = req.cookies.jwt_;
    if (!token) {
      return res.status(401).json({ message: "Ruta no autorizada - No hay token :/" });
    }
    console.log("protectRoute token:", token)

    const tokenDecodificado = jwt.verify(token, process.env.JWT_SECRET);
    if (!tokenDecodificado) {
      return res.status(401).json({ message: "Ruta no autorizada - Token inválido :/" });
    }
    console.log("protectRoute token decodificado:", tokenDecodificado)

    const userId = tokenDecodificado.userId;

    // Buscar al usuario en PostgreSQL por ID
    console.log("protectRoute userId:", userId)
    const result = await pool.query('SELECT id, username, email, fotoperfil, creado_en FROM usuarios WHERE id = $1', [userId]);
    console.log("protectRoute rows:", result.rows)
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
