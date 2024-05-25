const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const crypto = require('crypto');

dotenv.config();

async function validarDatosRegistro(dataSegura) {
    const errores = [];

    if (!dataSegura.nombre || typeof dataSegura.nombre !== 'string') {
        errores.push('El nombre es requerido y debe ser una cadena de caracteres.');
    }

    if (!dataSegura.email || typeof dataSegura.email !== 'string') {
        errores.push('El email es requerido y debe ser una cadena de caracteres.');
    }

    if (!dataSegura.contraseña || typeof dataSegura.contraseña !== 'string') {
        errores.push('La contraseña es requerida y debe ser una cadena de caracteres.');
    } else {
        // Verifica si la contraseña cumple con ciertos criterios de seguridad
        const longitudMinima = 8;
        if (dataSegura.contraseña.length < longitudMinima) {
            errores.push(`La contraseña debe tener al menos ${longitudMinima} caracteres.`);
        }

        // También podrías verificar otros criterios, como la presencia de caracteres especiales, números, etc.
    }

    // Devuelve un objeto con el resultado de la validación
    return {
        valido: errores.length === 0,
        errores: errores
    };
}

function verificarToken(req, res, next) {  // aun no aplicado
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ mensaje: 'Acceso denegado. Token no proporcionado.' });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, usuario) => {
        if (err) {
            return res.status(403).json({ mensaje: 'Token inválido.' });
        }
        req.usuario = usuario;
        next();
    });
}

// Función para generar un token JWT
function generateToken(data, expirationTime) {
    // Se firma el token utilizando el algoritmo RS256 y la clave privada RSA del entorno
    return jwt.sign({ data }, process.env.RSA_PRIVATE_KEY, { algorithm: 'RS256', expiresIn: expirationTime });
}

function decryptData(dataSegura) {
    // Obtén la clave y el IV de tu entorno (probablemente de tu archivo .env)
    const key = Buffer.from(process.env.AES_KEY, 'hex');
    const iv = Buffer.from(process.env.AES_IV, 'hex');

    console.log('encryptedData = ', dataSegura);

    console.log('key = ', key);
    console.log('iv = ', iv);
    // Verifica que la longitud de la clave y el IV sean correctas
    if (key.length !== 32) {
        throw new Error('La clave debe ser de 32 bytes (256 bits)');
    }
    if (iv.length !== 16) {
        throw new Error('El vector de inicialización (IV) debe ser de 16 bytes (128 bits)');
    }

    // Separar el texto cifrado, el IV y la AuthTag de encryptedData
    const parts = dataSegura.split(':');
    const encryptedText = parts.pop();
    const authTag = Buffer.from(parts.pop(), 'hex');

    // Crea un descifrador usando el algoritmo AES-256-GCM y la clave y el IV proporcionados
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(authTag);

    // Decifra los datos y conviértelos de hexadecimal a UTF-8
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
}

// Función asincrónica para obtener el hash de una contraseña
async function getHash(passwordString) {
    // Se obtiene el número de rondas de sal para el hash de contraseñas desde el entorno y se convierte a entero
    const saltRounds = parseInt(process.env.PASSWORD_SALT_ROUNDS);
    // Se genera el hash de la contraseña usando bcrypt y el número de rondas de sal
    const password_hash = await bcrypt.hash(passwordString, saltRounds);
    // Se devuelve el hash generado
    return password_hash;
}

// Exporta la función de validación de datos de registro
module.exports = {
    validarDatosRegistro,
    verificarToken,
    getHash,
    generateToken,
    decryptData
};