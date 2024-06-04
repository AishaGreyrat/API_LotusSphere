const { obtenerConexion } = require('../config/conexion');

async function registrarUsuario(nombre, usuario, email, password_hash) {
    const conexion = await obtenerConexion();
    try {
        await conexion.query('INSERT INTO usuarios (nombre, usuario, email, contraseña) VALUES (?, ?, ?, ?)', [nombre, usuario, email, password_hash]);
        console.log('Usuario registrado correctamente');
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        throw error;
    } finally {
        conexion.release();
    }
}

async function verificarUsuarioExistente(email) {
    const conexion = await obtenerConexion();
    try {
        const [results] = await conexion.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        return results[0];
    } catch (error) {
        console.error('Error al verificar usuario existente:', error);
        throw error;
    } finally {
        conexion.release();
    }
}

async function obtenerPorId(id) {
    const conexion = await obtenerConexion();
    try {
        const [results] = await conexion.query('SELECT * FROM usuarios WHERE id = ?', [id]);
        return results[0];
    } catch (error) {
        console.error('Error al obtener usuario por ID:', error);
        throw error;
    } finally {
        conexion.release();
    }
}

async function actualizarUsuario(id, nombre, usuario, email) {
    const conexion = await obtenerConexion();
    try {
        await conexion.query('UPDATE usuarios SET nombre = ?, usuario = ?, email = ? WHERE id = ?', [nombre, usuario, email, id]);
        console.log('Usuario actualizado correctamente');
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        throw error;
    } finally {
        conexion.release();
    }
}

async function eliminarUsuario(id) {
    const conexion = await obtenerConexion();
    try {
        await conexion.query('DELETE FROM usuarios WHERE id = ?', [id]);
        console.log('Usuario eliminado correctamente');
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        throw error;
    } finally {
        conexion.release();
    }
}

module.exports = {
    registrarUsuario,
    verificarUsuarioExistente,
    obtenerPorId,
    actualizarUsuario,
    eliminarUsuario
};
