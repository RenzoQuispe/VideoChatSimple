import express from 'express';
import { listarSalas } from '../controllers/sala.controllers.js';

const router = express.Router();

router.get('/listar',listarSalas);

export default router;