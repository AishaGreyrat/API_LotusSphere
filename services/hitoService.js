const hitosModel = require('../models/hitosModel');

async function crearHito(hitoData) {
    try {
        await hitosModel.crearHito(hitoData);
    } catch (error) {
        console.error("Error en el servicio al crear el hito:", error);
        throw error;
    }
}

module.exports = {
    crearHito
};
