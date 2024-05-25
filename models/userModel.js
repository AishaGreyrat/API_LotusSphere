const { obtenerConexion } = require('../database/conexion');

async function registrarUsuario(nombre, email, password_hash) {
    try {
        // Establecer conexión a la base de datos
        const conexion = await obtenerConexion();

        // Ejecutar la consulta SQL para insertar el usuario
        await conexion.query('INSERT INTO usuarios (nombre, email, contraseña) VALUES (?, ?, ?)', [nombre, email, password_hash]);

        // Registrar el usuario correctamente
        console.log('Usuario insertado correctamente');
    } catch (error) {
        // Manejar cualquier error que ocurra durante el registro
        console.error('Error al insertar usuario:', error);
        throw error;
    }
}

async function obtenerUsuarioPorNombre(nombre) {
    try {
        const conexion = await obtenerConexion();
        const [results] = await conexion.query('SELECT * FROM usuarios WHERE nombre = ?', [nombre]);
        console.log('resultados y nombre', results, nombre);
        return results[0];
    } catch (error) {
        console.error('Error al obtener usuario por nombre:', error);
        throw error;
    }
}

// Función para obtener un usuario por su ID
async function obtenerPorId(id) {
    const conexion = await obtenerConexion();
    try {
        const [results] = await conexion.query('SELECT * FROM usuarios WHERE id = ?', [id]);
        return results[0];
    } catch (error) {
        console.error('Error al obtener usuario por ID:', error);
        throw error;
    }
}

module.exports = {
    registrarUsuario,
    obtenerUsuarioPorNombre,
    obtenerPorId,
};