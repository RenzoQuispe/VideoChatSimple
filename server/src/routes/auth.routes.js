import express from 'express';
// importar autenticacion controllers
import { register,actualizarUsuario } from "../controllers/auth.controllers.js";

// enrutador
const router = express.Router();
// rutas
router.post('/register',register);
router.put('/actualizar/:id',actualizarUsuario);

export default router;