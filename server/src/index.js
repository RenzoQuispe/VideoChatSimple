import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();
const PORT = process.env.PORT;

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
app.listen(PORT,() =>{
    console.log('Server ejecutandose en el puerto '+PORT);
})