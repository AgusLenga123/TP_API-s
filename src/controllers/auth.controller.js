const authService = require('../services/auth.service');

const login = async (req, res, next) => {
    try {
        const { usuario, password } = req.body;

        if (!usuario || !password) {
            return res.status(400).json({ mensaje: 'Usuario y contraseña son requeridos.' });
        }

        const resultado = await authService.login(usuario, password);
        res.status(200).json(resultado);
    } catch (error) {
        next(error);
    }
};

// Solo para setup inicial — quitar o proteger en producción
const crearAdmin = async (req, res, next) => {
    try {
        const { usuario, password } = req.body;

        if (!usuario || !password) {
            return res.status(400).json({ mensaje: 'Usuario y contraseña son requeridos.' });
        }

        const resultado = await authService.crearAdmin(usuario, password);
        res.status(201).json({ mensaje: 'Administrador creado correctamente.', ...resultado });
    } catch (error) {
        next(error);
    }
};

module.exports = { login, crearAdmin };
