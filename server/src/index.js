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
//cors
app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true
    })
);
//
app.use(cookieParser());
app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

//rutas
app.use("/api/auth", authRoutes);
app.use("/api/sala",salaRoutes);
const rutaUploads = process.env.DB_RUTA_IMAGENES;
app.use('/uploads', express.static(rutaUploads));
// Leer los certificados
const key = fs.readFileSync('../certs/key.pem');
const cert = fs.readFileSync('../certs/cert.pem');

// Crear el server HTTPS
const server = https.createServer({ key, cert }, app);
server.listen(PORT_SERVER,'0.0.0.0',() =>{
    console.log('Server HTTPS ejecutandose en el puerto '+PORT_SERVER+'. Escuchando en:');
    console.log('https://localhost')
    console.log('https://127.0.0.1') 
    console.log('https://videochat.local')
    console.log('https://miapp.local') 
    probarConexionDB()
})