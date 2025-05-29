import express from 'express';
import dotenv from 'dotenv';
import fs from 'fs';
import https from 'https';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { probarConexionDB } from './libs/db.js';

dotenv.config();
const PORT = process.env.PORT;

// Configurar app
const app = express();
app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true
    })
);

// Leer los certificados
const key = fs.readFileSync('../certs/key.pem');
const cert = fs.readFileSync('../certs/cert.pem');

// Crear el server HTTPS
const server = https.createServer({ key, cert }, app);
server.listen(PORT,'0.0.0.0',() =>{
    console.log('Server HTTPS ejecutandose en el puerto '+PORT+'. Escuchando en:');
    console.log('https://localhost')
    console.log('https://127.0.0.1') 
    console.log('https://videochat.local')
    console.log('https://miapp.local') 
    probarConexionDB()
})