const clasificacionService = require('../services/clasificacion.service');

const obtenerClasificacion = async (req, res, next) => {
    try {
        const tabla = await clasificacionService.obtenerClasificacion();
        res.status(200).json(tabla);
    } catch (error) {
        next(error);
    }
};

module.exports = { obtenerClasificacion };
