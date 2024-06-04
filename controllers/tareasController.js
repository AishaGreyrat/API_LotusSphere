const tareasService = require('../services/tareasService');

async function crearTarea(req, res) {
    const { proyectoId, nombre, descripcion, fecha_inicio, fecha_fin } = req.body;
    const tareaData = {
        nombre,
        descripcion,
        fecha_inicio,
        fecha_fin,
        proyecto_id: proyectoId
    };
    try {
        await tareasService.crearTarea(tareaData);
        res.status(201).json({ message: 'Tarea creada exitosamente' });
    } catch (error) {
        console.error("Error al crear la tarea:", error);
        res.status(500).json({ error: 'Error al crear la tarea' });
    }
}

async function obtenerTareas(req, res) {
    const { proyectoId } = req.query;
    console.log('proyectoId de obtener tareas = ',proyectoId);
    try {
        const tareas = await tareasService.obtenerTareas(proyectoId);
        console.log('tareas = ', tareas);
        res.status(200).json(tareas);
    } catch (error) {
        console.error("Error al obtener tareas:", error);
        res.status(500).json({ error: 'Error al obtener tareas' });
    }
}

async function asignarPersona(req, res) {
    const { tareaId } = req.params;
    const { persona } = req.body;
    try {
        await tareasService.asignarPersona(tareaId, persona);
        res.status(200).json({ message: 'Persona asignada exitosamente' });
    } catch (error) {
        console.error("Error al asignar persona:", error);
        res.status(500).json({ error: 'Error al asignar persona' });
    }
}

module.exports = {
    crearTarea,
    obtenerTareas,
    asignarPersona
};
