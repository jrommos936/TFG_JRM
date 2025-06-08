
-- Tabla de usuarios
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL,
    rol ENUM('admin', 'participante', 'usuario') DEFAULT 'participante'
);

-- Tabla de fotos
CREATE TABLE fotos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    titulo VARCHAR(255),
    descripcion TEXT,
    archivo VARCHAR(255) NOT NULL,
    estado ENUM('pendiente', 'aceptada', 'rechazada') DEFAULT 'pendiente',
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabla de votos
CREATE TABLE votos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    foto_id INT NOT NULL,
    FOREIGN KEY (foto_id) REFERENCES fotos(id) ON DELETE CASCADE,
    UNIQUE (foto_id) -- Limita un voto por IP por foto
);


