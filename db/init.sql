-- Ejemplo de base de datos postgresql usada
-- Crear la base de datos y conectarse a ella antes de crear las tablas
CREATE USER admin_videochat WITH PASSWORD '123456789';
CREATE DATABASE videochat OWNER admin_videochat;
GRANT ALL PRIVILEGES ON DATABASE videochat TO admin_videochat;
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
-- Crear salas de prueba
INSERT INTO salas (nombre, contraseña, creado_por) VALUES ('Sala1', 'abc123', 14);
INSERT INTO salas (nombre, contraseña, creado_por) VALUES ('Sala2', NULL,15);
INSERT INTO salas (nombre, contraseña, creado_por) VALUES ('Sala3', 'claveSegura', 16);
INSERT INTO salas (nombre, contraseña, creado_por) VALUES ('Sala4', NULL, 17);
INSERT INTO salas (nombre, contraseña, creado_por) VALUES ('Sala5', 'sala123', 18);
INSERT INTO salas (nombre, contraseña, creado_por) VALUES ('Sala6', NULL, 19);
INSERT INTO salas (nombre, contraseña, creado_por) VALUES ('Sala7', 'qwerty', 20);
INSERT INTO salas (nombre, contraseña, creado_por) VALUES ('Sala8', NULL, 21);
INSERT INTO salas (nombre, contraseña, creado_por) VALUES ('Sala9', 'xyz789', 22);
INSERT INTO salas (nombre, contraseña, creado_por) VALUES ('Sala10', NULL, 23);
