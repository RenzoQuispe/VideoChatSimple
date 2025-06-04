import express from 'express';
// importar autenticacion controllers
import { checkAuth, logout, login, register, actualizarUsuario } from "../controllers/auth.controllers.js";

// enrutador
const router = express.Router();
// rutas
router.post('/register', register);
router.put('/actualizar/:id', actualizarUsuario);
router.post('/login', login);
router.post('/logout', logout);
router.get("/check", protectRoute, checkAuth);
export default router;