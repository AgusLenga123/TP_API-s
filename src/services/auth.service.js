const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin.model');

const login = async (usuario, password) => {
    const admin = await Admin.findOne({ usuario });
    if (!admin) {
        throw { status: 401, message: 'Credenciales inválidas.' };
    }

    const passwordValida = await admin.compararPassword(password);
    if (!passwordValida) {
        throw { status: 401, message: 'Credenciales inválidas.' };
    }

    const token = jwt.sign(
        { id: admin._id, usuario: admin.usuario },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    return { token, usuario: admin.usuario };
};

const crearAdmin = async (usuario, password) => {
    const existe = await Admin.findOne({ usuario });
    if (existe) {
        throw { status: 400, message: 'El usuario ya existe.' };
    }
    const admin = new Admin({ usuario, passwordHash: password });
    await admin.save();
    return { usuario: admin.usuario };
};

module.exports = { login, crearAdmin };
