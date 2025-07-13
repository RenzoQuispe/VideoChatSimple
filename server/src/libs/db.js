import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
});

export const probarConexionDB = async () => {
    const maxIntentos = 10;
    const delay = ms => new Promise(res => setTimeout(res, ms));
  
    for (let intento = 1; intento <= maxIntentos; intento++) {
      try {
        await pool.query('SELECT NOW()');
        console.log("Conexión a PostgreSQL exitosa");
        return;
      } catch (error) {
        console.error(`Intento ${intento}: No se pudo conectar a PostgreSQL, reintentando ...`);
        if (intento === maxIntentos) {
          console.error("Error de conexión a la base de datos:", error);
          process.exit(1);
        }
        await delay(2000); // espera 2 segundos
      }
    }
  };
  
export default pool;
