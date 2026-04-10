const partidoService = require('../services/partido.service');

const obtenerTodos = async (req, res, next) => {
    try {
        // Permite filtros: ?equipoId=xxx&finalizado=true/false
        const partidos = await partidoService.obtenerTodos(req.query);
        res.status(200).json(partidos);
    } catch (error) {
        next(error);
    }
};

const obtenerPorId = async (req, res, next) => {
    try {
        const partido = await partidoService.obtenerPorId(req.params.id);
        res.status(200).json(partido);
    } catch (error) {
        next(error);
    }
};

const crear = async (req, res, next) => {
    try {
        const { equipoLocal, equipoVisitante, fecha, horario, lugar } = req.body;

        if (!equipoLocal || !equipoVisitante || !fecha || !horario || !lugar) {
            return res.status(400).json({
                mensaje: 'Equipo local, equipo visitante, fecha, horario y lugar son requeridos.',
            });
        }

        const partido = await partidoService.crear({
            equipoLocal,
            equipoVisitante,
            fecha,
            horario,
            lugar,
        });
        res.status(201).json(partido);
    } catch (error) {
        next(error);
    }
};

const actualizar = async (req, res, next) => {
    try {
        const { equipoLocal, equipoVisitante, fecha, horario, lugar } = req.body;
        const partido = await partidoService.actualizar(req.params.id, {
            equipoLocal,
            equipoVisitante,
            fecha,
            horario,
            lugar,
        });
        res.status(200).json(partido);
    } catch (error) {
        next(error);
    }
};

const eliminar = async (req, res, next) => {
    try {
        const resultado = await partidoService.eliminar(req.params.id);
        res.status(200).json(resultado);
    } catch (error) {
        next(error);
    }
};

const cargarResultado = async (req, res, next) => {
    try {
        const { puntosLocal, puntosVisitante } = req.body;

        if (puntosLocal === undefined || puntosVisitante === undefined) {
            return res.status(400).json({
                mensaje: 'puntosLocal y puntosVisitante son requeridos.',
            });
        }

        const partido = await partidoService.cargarResultado(
            req.params.id,
            Number(puntosLocal),
            Number(puntosVisitante)
        );
        res.status(200).json(partido);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    obtenerTodos,
    obtenerPorId,
    crear,
    actualizar,
    eliminar,
    cargarResultado,
};
