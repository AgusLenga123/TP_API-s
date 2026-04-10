const equipoService = require('../services/equipo.service');

const obtenerTodos = async (req, res, next) => {
    try {
        const equipos = await equipoService.obtenerTodos();
        res.status(200).json(equipos);
    } catch (error) {
        next(error);
    }
};

const obtenerPorId = async (req, res, next) => {
    try {
        const datos = await equipoService.obtenerPorId(req.params.id);
        res.status(200).json(datos);
    } catch (error) {
        next(error);
    }
};

const crear = async (req, res, next) => {
    try {
        const { nombre, entrenador } = req.body;

        if (!nombre || !entrenador) {
            return res.status(400).json({ mensaje: 'Nombre y entrenador son requeridos.' });
        }

        const equipo = await equipoService.crear({ nombre, entrenador });
        res.status(201).json(equipo);
    } catch (error) {
        next(error);
    }
};

const actualizar = async (req, res, next) => {
    try {
        const { nombre, entrenador } = req.body;
        const equipo = await equipoService.actualizar(req.params.id, { nombre, entrenador });
        res.status(200).json(equipo);
    } catch (error) {
        next(error);
    }
};

const eliminar = async (req, res, next) => {
    try {
        const resultado = await equipoService.eliminar(req.params.id);
        res.status(200).json(resultado);
    } catch (error) {
        next(error);
    }
};

module.exports = { obtenerTodos, obtenerPorId, crear, actualizar, eliminar };
