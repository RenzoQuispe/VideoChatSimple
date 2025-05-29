import express from 'express';
// importar autenticacion controllers
import { register } from "../controllers/auth.controllers.js";

// enrutador
const router = express.Router();
// rutas
router.post('/register',register);

export default router;