const Partido = require('../models/Partido.model');
const Equipo = require('../models/Equipo.model');

const obtenerTodos = async (filtros = {}) => {
    const query = {};

    if (filtros.equipoId) {
        query.$or = [
            { equipoLocal: filtros.equipoId },
            { equipoVisitante: filtros.equipoId },
        ];
    }

    if (filtros.finalizado !== undefined) {
        query.finalizado = filtros.finalizado === 'true';
    }

    return await Partido.find(query)
        .populate('equipoLocal', 'nombre')
        .populate('equipoVisitante', 'nombre')
        .sort({ fecha: 1 });
};

const obtenerPorId = async (id) => {
    const partido = await Partido.findById(id)
        .populate('equipoLocal', 'nombre entrenador estadisticas')
        .populate('equipoVisitante', 'nombre entrenador estadisticas');
    if (!partido) throw { status: 404, message: 'Partido no encontrado.' };
    return partido;
};

const crear = async (datos) => {
    const { equipoLocal, equipoVisitante } = datos;

    if (equipoLocal === equipoVisitante) {
        throw { status: 400, message: 'El equipo local y visitante no pueden ser el mismo.' };
    }

    const [local, visitante] = await Promise.all([
        Equipo.findById(equipoLocal),
        Equipo.findById(equipoVisitante),
    ]);

    if (!local) throw { status: 404, message: 'Equipo local no encontrado.' };
    if (!visitante) throw { status: 404, message: 'Equipo visitante no encontrado.' };

    const partido = new Partido(datos);
    await partido.save();
    return await partido.populate([
        { path: 'equipoLocal', select: 'nombre' },
        { path: 'equipoVisitante', select: 'nombre' },
    ]);
};

const actualizar = async (id, datos) => {
    // No permitir editar resultado por esta ruta
    delete datos.resultado;
    delete datos.finalizado;

    const partido = await Partido.findById(id);
    if (!partido) throw { status: 404, message: 'Partido no encontrado.' };
    if (partido.finalizado) {
        throw { status: 400, message: 'No se puede editar un partido ya finalizado. Para corregir el resultado usá PATCH /partidos/:id/resultado.' };
    }

    if (datos.equipoLocal && datos.equipoVisitante &&
        datos.equipoLocal === datos.equipoVisitante) {
        throw { status: 400, message: 'El equipo local y visitante no pueden ser el mismo.' };
    }

    const actualizado = await Partido.findByIdAndUpdate(id, datos, {
        new: true,
        runValidators: true,
    })
        .populate('equipoLocal', 'nombre')
        .populate('equipoVisitante', 'nombre');

    return actualizado;
};

const eliminar = async (id) => {
    const partido = await Partido.findById(id);
    if (!partido) throw { status: 404, message: 'Partido no encontrado.' };

    // Si el partido ya tenía resultado, revertir estadísticas
    if (partido.finalizado) {
        await _revertirEstadisticas(partido);
    }

    await partido.deleteOne();
    return { mensaje: 'Partido eliminado correctamente.' };
};

const cargarResultado = async (id, puntosLocal, puntosVisitante) => {
    if (puntosLocal === undefined || puntosVisitante === undefined) {
        throw { status: 400, message: 'Debe proporcionar los puntos de ambos equipos.' };
    }
    if (puntosLocal < 0 || puntosVisitante < 0) {
        throw { status: 400, message: 'Los puntos no pueden ser negativos.' };
    }

    const partido = await Partido.findById(id);
    if (!partido) throw { status: 404, message: 'Partido no encontrado.' };

    // Si ya tenía resultado, revertir estadísticas anteriores antes de aplicar el nuevo
    if (partido.finalizado) {
        await _revertirEstadisticas(partido);
    }

    // Actualizar resultado y marcar como finalizado
    partido.resultado = { puntosLocal, puntosVisitante };
    partido.finalizado = true;
    await partido.save();

    // Actualizar estadísticas de ambos equipos
    await _actualizarEstadisticas(partido);

    return await partido.populate([
        { path: 'equipoLocal', select: 'nombre estadisticas' },
        { path: 'equipoVisitante', select: 'nombre estadisticas' },
    ]);
};

// ─── Helpers privados ────────────────────────────────────────────────────────

const _actualizarEstadisticas = async (partido) => {
    const { equipoLocal, equipoVisitante, resultado } = partido;
    const { puntosLocal, puntosVisitante } = resultado;

    const local = await Equipo.findById(equipoLocal);
    const visitante = await Equipo.findById(equipoVisitante);

    // Incrementar partidos jugados y tantos
    local.estadisticas.partidosJugados += 1;
    local.estadisticas.tantosAFavor += puntosLocal;
    local.estadisticas.tantosEnContra += puntosVisitante;

    visitante.estadisticas.partidosJugados += 1;
    visitante.estadisticas.tantosAFavor += puntosVisitante;
    visitante.estadisticas.tantosEnContra += puntosLocal;

    if (puntosLocal > puntosVisitante) {
        // Ganó local
        local.estadisticas.partidosGanados += 1;
        local.estadisticas.puntos += 3;
        visitante.estadisticas.partidosPerdidos += 1;
    } else if (puntosLocal < puntosVisitante) {
        // Ganó visitante
        visitante.estadisticas.partidosGanados += 1;
        visitante.estadisticas.puntos += 3;
        local.estadisticas.partidosPerdidos += 1;
    } else {
        // Empate
        local.estadisticas.partidosEmpatados += 1;
        local.estadisticas.puntos += 1;
        visitante.estadisticas.partidosEmpatados += 1;
        visitante.estadisticas.puntos += 1;
    }

    await Promise.all([local.save(), visitante.save()]);
};

const _revertirEstadisticas = async (partido) => {
    const { equipoLocal, equipoVisitante, resultado } = partido;
    const { puntosLocal, puntosVisitante } = resultado;

    const local = await Equipo.findById(equipoLocal);
    const visitante = await Equipo.findById(equipoVisitante);

    local.estadisticas.partidosJugados -= 1;
    local.estadisticas.tantosAFavor -= puntosLocal;
    local.estadisticas.tantosEnContra -= puntosVisitante;

    visitante.estadisticas.partidosJugados -= 1;
    visitante.estadisticas.tantosAFavor -= puntosVisitante;
    visitante.estadisticas.tantosEnContra -= puntosLocal;

    if (puntosLocal > puntosVisitante) {
        local.estadisticas.partidosGanados -= 1;
        local.estadisticas.puntos -= 3;
        visitante.estadisticas.partidosPerdidos -= 1;
    } else if (puntosLocal < puntosVisitante) {
        visitante.estadisticas.partidosGanados -= 1;
        visitante.estadisticas.puntos -= 3;
        local.estadisticas.partidosPerdidos -= 1;
    } else {
        local.estadisticas.partidosEmpatados -= 1;
        local.estadisticas.puntos -= 1;
        visitante.estadisticas.partidosEmpatados -= 1;
        visitante.estadisticas.puntos -= 1;
    }

    await Promise.all([local.save(), visitante.save()]);
};

module.exports = {
    obtenerTodos,
    obtenerPorId,
    crear,
    actualizar,
    eliminar,
    cargarResultado,
};
