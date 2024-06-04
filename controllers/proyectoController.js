const proyectoService = require('../services/proyectoService');
const autenticador = require('../middlewares/autenticador');


async function crearProyecto(req, res) {
    const { user_id, titulo, descripcion, fecha_inicio, fecha_fin } = req.body;

    console.log("newProyect = ", req.body);

    try {

        const usuarioExistente = await BuscarId(user_id);
        console.log('user_id = ', user_id);
        if (usuarioExistente) {
            console.log("el usuario existe");

            await proyectoService.registrarProyecto( user_id, titulo, descripcion, fecha_inicio, fecha_fin );
            res.status(201).send('Proyecto registrado correctamente');
        } else {
            res.status(404).send('El usuario no existe');
        }


    } catch (error) {
        console.error('Error al registrar usuario en la API:', error);
        res.status(500).send('Error interno del servidor');
    }
}



async function obtenerProyectos(req, res) {
    const userId = req.query.userId; // Asegúrate de que estás usando req.query.userId
    console.log('userId = ', userId);

    try {
        const proyectos = await proyectoService.encontrarTodos(userId);
        console.log('proyectos = ', proyectos);
        res.status(200).json(proyectos);
    } catch (error) {
        console.error('Error al obtener proyectos:', error);
        res.status(500).send('Error al obtener los proyectos del usuario');
    }
}



async function obtenerProyectoPorId(req, res) {
    try {
        const proyectoId = req.params.id;
        const proyecto = await proyectoService.obtenerPorId(proyectoId);
        res.json(proyecto);const tareasService = require('../services/tareasService');

exports.crearTarea = async (req, res) => {
    try {
        const { proyectoId, titulo, descripcion } = req.body;
        const tarea = await tareasService.crearTarea(proyectoId, titulo, descripcion);
        res.status(200).json(tarea);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al crear la tarea');
    }
};

    } catch (error) {
        console.error('Error al obtener el proyecto por ID:', error.message);
        res.status(500).json({ error: 'Error al obtener el proyecto por ID' });
    }
}

async function eliminarProyecto(req, res) {
    const proyectoId = req.params.id;

    try {
        await proyectoService.eliminarProyecto(proyectoId);
        res.status(200).send('Proyecto eliminado correctamente');
    } catch (error) {
        console.error('Error al eliminar el proyecto:', error.message);
        res.status(500).send('Error interno del servidor');
    }
}

async function editarProyecto(req, res) {
    const proyectoId = req.params.id;
    console.log("req.body = ", req.body);

    try {
        const proyecto = await proyectoService.obtenerProyectoPorId(proyectoId);
        const tareas = await proyectoService.obtenerTareas(proyectoId);

        if (proyecto) {
            res.json({ proyecto, tareas });
        } else {
            res.status(404).send('Proyecto no encontrado');
        }
    } catch (error) {
        console.error('Error al obtener el proyecto por ID:', error.message);
        res.status(500).send('Error interno del servidor');
    }
}   


module.exports = {
    crearProyecto,
    obtenerProyectos,
    obtenerProyectoPorId,
    eliminarProyecto,
    editarProyecto
}
