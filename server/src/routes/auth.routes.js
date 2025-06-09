import express from 'express';
import { checkAuth, logout, login, register } from "../controllers/auth.controllers.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
// enrutador
const router = express.Router();
// rutas
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/check', protectRoute, checkAuth);
export default router;