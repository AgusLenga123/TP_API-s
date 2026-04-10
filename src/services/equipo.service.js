const Equipo = require('../models/Equipo.model');
const Jugador = require('../models/Jugador.model');
const Partido = require('../models/Partido.model');

const obtenerTodos = async () => {
    return await Equipo.find().populate('jugadores', 'nombre apellido categoria');
};

const obtenerPorId = async (id) => {
    const equipo = await Equipo.findById(id).populate('jugadores', 'nombre apellido categoria');
    if (!equipo) throw { status: 404, message: 'Equipo no encontrado.' };

    // Partidos jugados y pendientes
    const partidos = await Partido.find({
        $or: [{ equipoLocal: id }, { equipoVisitante: id }],
    })
        .populate('equipoLocal', 'nombre')
        .populate('equipoVisitante', 'nombre');

    return { equipo, partidos };
};

const crear = async (datos) => {
    const equipo = new Equipo(datos);
    await equipo.save();
    return equipo;
};

const actualizar = async (id, datos) => {
    const equipo = await Equipo.findByIdAndUpdate(id, datos, {
        new: true,
        runValidators: true,
    }).populate('jugadores', 'nombre apellido categoria');
    if (!equipo) throw { status: 404, message: 'Equipo no encontrado.' };
    return equipo;
};

const eliminar = async (id) => {
    const equipo = await Equipo.findById(id);
    if (!equipo) throw { status: 404, message: 'Equipo no encontrado.' };

    // Eliminar jugadores asociados
    await Jugador.deleteMany({ equipo: id });

    await equipo.deleteOne();
    return { mensaje: 'Equipo y sus jugadores eliminados correctamente.' };
};

module.exports = { obtenerTodos, obtenerPorId, crear, actualizar, eliminar };
