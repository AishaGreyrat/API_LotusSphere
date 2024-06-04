-- Creación de la base de datos llamada EnigmaText
CREATE DATABASE IF NOT EXISTS API_LotusSphere;
-- Usar esta base de datos
USE API_LotusSphere;

-- TABLAS

-- Tabla para almacenar usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    usuario VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    contraseña VARCHAR(255) NOT NULL
);

CREATE TABLE proyectos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    fecha_inicio DATE,
    fecha_fin DATE,
    usuario_id INT,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE tareas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    fecha_inicio DATE,
    fecha_fin DATE,
    estado ENUM('Pendiente', 'En Progreso', 'Completada') DEFAULT 'Pendiente',
    proyecto_id INT,
    FOREIGN KEY (proyecto_id) REFERENCES proyectos(id)
);

CREATE TABLE hitos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    fecha_limite DATE,
    proyecto_id INT,
    FOREIGN KEY (proyecto_id) REFERENCES proyectos(id)
);

CREATE TABLE asignaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tarea_id INT,
    usuario_id INT,
    fecha_asignacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tarea_id) REFERENCES tareas(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE progreso (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tarea_id INT,
    descripcion TEXT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    porcentaje_completado INT CHECK (porcentaje_completado BETWEEN 0 AND 100),
    FOREIGN KEY (tarea_id) REFERENCES tareas(id)
);

CREATE TABLE comunicaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    proyecto_id INT,
    mensaje TEXT,
    fecha_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (proyecto_id) REFERENCES proyectos(id)
);

CREATE TABLE informes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    proyecto_id INT,
    titulo VARCHAR(255),
    contenido TEXT,
    fecha_generacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (proyecto_id) REFERENCES proyectos(id)
);

SELECT * FROM proyectos;
SELECT * FROM tareas;
SELECT * FROM proyectos;

FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE


DROP DATABASE API_LotusSphere;