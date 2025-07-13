-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  contraseña TEXT NOT NULL,
  fotoperfil TEXT DEFAULT '',
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Tabla de salas
CREATE TABLE IF NOT EXISTS salas (
    id SERIAL PRIMARY KEY,
    nombre TEXT UNIQUE NOT NULL,
    contraseña TEXT,  -- NULL si la sala no tiene contraseña
    creado_por INTEGER REFERENCES usuarios(id) ON DELETE SET NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Relacion usuarios-salas (usuarios dentro de salas)
CREATE TABLE IF NOT EXISTS usuarios_salas (
    usuario_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
    sala_id INTEGER REFERENCES salas(id) ON DELETE CASCADE,
    es_admin BOOLEAN DEFAULT FALSE,
    unido_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (usuario_id, sala_id)
);
-- tabla para chat general en la sala
CREATE TABLE IF NOT EXISTS mensajes (
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
-- Crear usuarios de prueba
INSERT INTO usuarios (username, email, contraseña) VALUES 
('usuario1', 'user1@example.com', '123'),
('usuario2', 'user2@example.com', '123'),
('usuario3', 'user3@example.com', '123');
-- Crear salas de prueba
INSERT INTO salas (nombre, contraseña, creado_por) VALUES 
('Sala1', 'abc123', 1),
('Sala2', NULL, 2),
('Sala3', 'claveSegura', 3);
