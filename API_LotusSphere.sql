-- Creación de la base de datos llamada EnigmaText
CREATE DATABASE IF NOT EXISTS API_LotusSphere;
-- Usar esta base de datos
USE API_LotusSphere;

-- TABLAS

-- Tabla para almacenar usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    contraseña VARCHAR(255) NOT NULL
);