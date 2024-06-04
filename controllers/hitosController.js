const hitosService = require('../services/hitoService');

async function crearHito(req, res) {
    const { proyectoId, nombre, descripcion, fecha_limite } = req.body;
    const hitoData = {
        nombre,
        descripcion,
        fecha_limite,
        proyecto_id: proyectoId
    };
    try {
        await hitosService.crearHito(hitoData);
        res.status(201).json({ message: 'Hito creado exitosamente' });
    } catch (error) {
        console.error("Error al crear el hito:", error);
        res.status(500).json({ error: 'Error al crear el hito' });
    }
}

module.exports = {
    crearHito
};
