const userModel = require('../models/userModel'); // Crea una constante llamada Usuario que recibe funciones de mis modelos
const authMiddleWare = require('../middlewares/authMiddleware');

async function registrarUsuario(dataSegura) {
    console.log('dataSegura = ', dataSegura);
    console.log('dataSegura nombre, email, passwordHash = ', dataSegura.nombre, dataSegura.email, dataSegura.passwordHash);
    try {
        // Descifrar los datos seguros recibidos de la aplicación web
        const nombre = authMiddleWare.decryptData(dataSegura.nombre);
        const email = authMiddleWare.decryptData(dataSegura.email);
        let password_hash = authMiddleWare.decryptData(dataSegura.passwordHash);

        password_hash = await authMiddleWare.getHash(password_hash);

        // Registrar al usuario en la base de datos utilizando el modelo
        return await userModel.registrarUsuario(nombre, email, password_hash);
    } catch (error) {
        // Manejar cualquier error que ocurra
        console.error('Error al registrar usuario en la API:', error);
        throw error;
    }
}

async function verificarRegistro(nombre) {
    try {
        const usuarioExistente = await userModel.obtenerUsuarioPorNombre(nombre);
        console.log('nombre y usuarioExistente', nombre, usuarioExistente);
        if (usuarioExistente) {
            return { status: 400, message: 'El usuario ya está registrado' };
        }
        return { status: 200, message: 'El usuario no está registrado' };
    } catch (error) {
        console.error('Error al verificar registro:', error);
        return { status: 500, message: 'Error interno del servidor' };
    }
}

module.exports = {
    registrarUsuario,
    verificarRegistro
};
