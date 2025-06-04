import express from 'express';
// importar autenticacion controllers
import { logout, login, register, actualizarUsuario } from "../controllers/auth.controllers.js";

// enrutador
const router = express.Router();
// rutas
router.post('/register', register);
router.put('/actualizar/:id', actualizarUsuario);
router.post('/login', login);
router.post('/logout', logout);
export default router;