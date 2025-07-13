import express from 'express';
import dotenv from 'dotenv';
import fs from 'fs';
import https from 'https';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { probarConexionDB } from './libs/db.js';

import authRoutes from './routes/auth.routes.js';
import salaRoutes from './routes/sala.routes.js';

dotenv.config();
const PORT_SERVER = process.env.PORT_SERVER;

// Configurar app
const app = express();

// CORS
const corsOptions = {
    origin: function (origin, callback) {

        if (!origin) return callback(null, true);

        if (origin.startsWith("http://localhost:5173")) return callback(null, true);

        const regexRedLocal = /^http:\/\/192\.168\.1\.\d{1,3}:5173$/;

        if (regexRedLocal.test(origin)) return callback(null, true);

        return callback(new Error("CORS no permitido desde este origen: " + origin));

    },
    credentials: true
};
app.use(cors(corsOptions));


app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

//rutas
app.use("/api/auth", authRoutes);
app.use("/api/sala", salaRoutes);
const rutaUploads = process.env.DB_RUTA_IMAGENES;
app.use('/uploads', express.static(rutaUploads));
// Leer los certificados
const key = fs.readFileSync('./certs/key.pem');
const cert = fs.readFileSync('./certs/cert.pem');

// Crear el server HTTPS
const server = https.createServer({ key, cert }, app);
server.listen(PORT_SERVER, '0.0.0.0', () => {
    console.log('Server HTTPS ejecutandose en el puerto ' + PORT_SERVER ); // En mi caso escuchando en videochat.local y 192.168.1.10
    probarConexionDB()
})