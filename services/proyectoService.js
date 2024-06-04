const proyectoModel = require('../models/proyectoModel');


async function registrarProyecto( user_id, titulo, descripcion, fecha_inicio, fecha_fin ) {
    try {
        await proyectoModel.registrarProyecto( user_id, titulo, descripcion, fecha_inicio, fecha_fin );
    } catch (error) {
        console.error('Error al registrar usuario en el servicio:', error);
        throw error;
    }
}

async function encontrarTodos(id) {
    try {
        return await proyectoModel.obtenerTodos(id);
    } catch (error) {
        console.error('Error al obtener usuario por nombre en el servicio:', error);
        throw error;
    }
}

async function obtenerTareas(proyectoId) {
    try {
        return await proyectoModel.obtenerTareas(proyectoId);
    } catch (error) {
        console.error('Error al obtener tareas:', error);
        throw error;
    }
}

async function obtenerPorId(proyectoId) {
    try {
        return await proyectoModel.obtenerId(proyectoId);
    } catch (error) {
        console.error('Error al obtener el proyecto por ID:', error.message);
        throw error;
    }
}

async function eliminarProyecto(proyectoId) {
    try {
        await proyectoModel.eliminarProyecto(proyectoId);
    } catch (error) {
        console.error('Error al eliminar el proyecto:', error.message);
        throw error;
    }
}



module.exports = {
    registrarProyecto,
    encontrarTodos,
    obtenerPorId,
    eliminarProyecto,
    obtenerTareas
};