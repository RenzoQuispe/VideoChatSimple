-- Ejemplo de base de datos postgresql usada
-- Crear la base de datos y conectarse a ella antes de crear las tablas
CREATE USER admin_videochat WITH PASSWORD '123456789';
CREATE DATABASE videochatsimple OWNER admin_videochat;
GRANT ALL PRIVILEGES ON DATABASE videochatsimple TO admin_videochat;
-- Tabla de usuarios
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  contraseña TEXT NOT NULL,
  fotoperfil TEXT DEFAULT '',
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Tabla de salas
CREATE TABLE salas (
    id SERIAL PRIMARY KEY,
    nombre TEXT UNIQUE NOT NULL,
    contraseña TEXT,  -- NULL si la sala no tiene contraseña
    creado_por INTEGER REFERENCES usuarios(id) ON DELETE SET NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Relacion usuarios-salas (usuarios dentro de salas)
CREATE TABLE usuarios_salas (
    usuario_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
    sala_id INTEGER REFERENCES salas(id) ON DELETE CASCADE,
    es_admin BOOLEAN DEFAULT FALSE,
    unido_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (usuario_id, sala_id)
);
-- tabla para chat general en la sala
CREATE TABLE mensajes (
  id SERIAL PRIMARY KEY,
  sala_id INTEGER REFERENCES salas(id) ON DELETE CASCADE,
  usuario_id INTEGER REFERENCES usuarios(id) ON DELETE SET NULL,
  contenido TEXT NOT NULL,
  enviado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Permisos
GRANT ALL PRIVILEGES ON TABLE salas TO admin_videochat;
GRANT ALL PRIVILEGES ON TABLE mensajes TO admin_videochat;
GRANT ALL PRIVILEGES ON TABLE usuarios TO admin_videochat;
GRANT ALL PRIVILEGES ON TABLE usuarios_salas TO admin_videochat;
