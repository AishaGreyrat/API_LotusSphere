const { obtenerConexion } = require('../config/conexion');

async function registrarProyecto(user_id, titulo, descripcion, fecha_inicio, fecha_fin) {
    try {
        // Establecer conexión a la base de datos
        const conexion = await obtenerConexion();

        // Ejecutar la consulta SQL para insertar el usuario
        await conexion.query('INSERT INTO proyectos (nombre, descripcion, fecha_inicio, fecha_fin, usuario_id) VALUES (?, ?, ?, ?, ?)', [titulo, descripcion, fecha_inicio, fecha_fin, user_id]);

        // Registrar el usuario correctamente
        console.log('Proyecto insertado correctamente');
    } catch (error) {
        // Manejar cualquier error que ocurra durante el registro
        console.error('Error al insertar usuario:', error);
        throw error;
    }
}

async function verificarUsuarioPorId(id) {
    try {
        const conexion = await obtenerConexion();

        console.log('id del modelo = ', id);
        const [results] = await conexion.query('SELECT * FROM usuarios WHERE id = ?', [id]);
        console.log('resultados de verificarUsuario = ', results)
        return results[0];
    } catch (error) {
        console.error('Error al obtener usuario por email', error);
        throw error;
    }
}

async function obtenerTodos(id){
    const conexion = await obtenerConexion();
    try {
        const [results] = await conexion.query('SELECT * FROM proyectos WHERE usuario_id = ?', [id]);
        console.log('results = ', results);
        return results; // Devuelve todos los resultados
    } catch (error) {
        console.error('Error al obtener proyectos por usuario:', error);
        throw error;
    }
}

async function obtenerTareas(proyectoId) {
    const conexion = await obtenerConexion();
    try {
        const [results] = await conexion.query('SELECT * FROM tareas WHERE proyecto_id = ?', [proyectoId]);
        return results;
    } catch (error) {
        console.error('Error al obtener tareas por proyecto ID:', error);
        throw error;
    }
}

// Función para obtener un usuario por su ID
async function obtenerId(id) {
    const conexion = await obtenerConexion();
    try {
        const [results] = await conexion.query('SELECT * FROM proyectos WHERE id = ?', [id]);
        return results[0];
    } catch (error) {
        console.error('Error al obtener usuario por ID:', error);
        throw error;
    }
}

module.exports = {
    registrarProyecto,
    verificarUsuarioPorId,
    obtenerId,
    obtenerTodos,
    obtenerTareas
};