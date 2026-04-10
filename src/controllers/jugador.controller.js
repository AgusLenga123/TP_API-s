const jugadorService = require('../services/jugador.service');

const obtenerTodos = async (req, res, next) => {
    try {
        // Permite filtrar por equipo: GET /jugadores?equipoId=xxx
        const jugadores = await jugadorService.obtenerTodos(req.query.equipoId);
        res.status(200).json(jugadores);
    } catch (error) {
        next(error);
    }
};

const obtenerPorId = async (req, res, next) => {
    try {
        const jugador = await jugadorService.obtenerPorId(req.params.id);
        res.status(200).json(jugador);
    } catch (error) {
        next(error);
    }
};

const crear = async (req, res, next) => {
    try {
        const { nombre, apellido, categoria, equipo } = req.body;

        if (!nombre || !apellido || !categoria || !equipo) {
            return res.status(400).json({
                mensaje: 'Nombre, apellido, categoría y equipo son requeridos.',
            });
        }

        const jugador = await jugadorService.crear({ nombre, apellido, categoria, equipo });
        res.status(201).json(jugador);
    } catch (error) {
        next(error);
    }
};

const actualizar = async (req, res, next) => {
    try {
        const { nombre, apellido, categoria, equipo } = req.body;
        const jugador = await jugadorService.actualizar(req.params.id, {
            nombre,
            apellido,
            categoria,
            equipo,
        });
        res.status(200).json(jugador);
    } catch (error) {
        next(error);
    }
};

const eliminar = async (req, res, next) => {
    try {
        const resultado = await jugadorService.eliminar(req.params.id);
        res.status(200).json(resultado);
    } catch (error) {
        next(error);
    }
};

module.exports = { obtenerTodos, obtenerPorId, crear, actualizar, eliminar };
