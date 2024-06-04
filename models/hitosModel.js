const { obtenerConexion } = require('../config/conexion');

async function crearHito(hitoData) {
    const conexion = await obtenerConexion();
    try {
        await conexion.query('INSERT INTO hitos SET ?', [hitoData]);
    } catch (error) {
        console.error("Error al crear el hito:", error);
        throw error;
    } finally {
        conexion.release();
    }
}

module.exports = {
    crearHito
};
