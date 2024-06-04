const { obtenerConexion } = require('../config/conexion');

async function crearTarea(tareaData) {
    console.log("tareaData = ", tareaData);
    const conexion = await obtenerConexion();
    try {
        await conexion.query('INSERT INTO tareas SET ?', [tareaData]);
    } catch (error) {
        console.error("Error al crear la tarea:", error);
        throw error;
    } finally {
        conexion.release();
    }
}

async function obtenerTareas(proyectoId) {
    const conexion = await obtenerConexion();
    try {
        const [rows] = await conexion.query(
            "SELECT * FROM tareas WHERE proyecto_id = ?",
            [proyectoId]
        );
        return rows;
    } catch (error) {
        console.error("Error al obtener tareas:", error);
        throw error;
    } finally {
        conexion.release();
    }
}

async function asignarPersona(tareaId, persona) {
    const conexion = await obtenerConexion();
    try {
        await conexion.query('UPDATE tareas SET asignado_a = ? WHERE id = ?', [persona, tareaId]);
    } catch (error) {
        console.error("Error al asignar persona:", error);
        throw error;
    } finally {
        conexion.release();
    }
}

module.exports = {
    crearTarea,
    obtenerTareas,
    asignarPersona
};
