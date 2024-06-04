const tareasModel = require('../models/tareasModel');

async function crearTarea(tareaData) {
    try {
        await tareasModel.crearTarea(tareaData);
    } catch (error) {
        console.error("Error en el servicio al crear la tarea:", error);
        throw error;
    }
}

async function obtenerTareas(proyectoId) {
    try {
        return await tareasModel.obtenerTareas(proyectoId);
    } catch (error) {
        console.error("Error en el servicio al obtener las tareas:", error);
        throw error;
    }
}

async function asignarPersona(tareaId, persona) {
    try {
        await tareasModel.asignarPersona(tareaId, persona);
    } catch (error) {
        console.error("Error en el servicio al asignar persona:", error);
        throw error;
    }
}

module.exports = {
    crearTarea,
    obtenerTareas,
    asignarPersona
};
