const Jugador = require('../models/Jugador.model');
const Equipo = require('../models/Equipo.model');

const obtenerTodos = async (equipoId) => {
    const filtro = equipoId ? { equipo: equipoId } : {};
    return await Jugador.find(filtro).populate('equipo', 'nombre');
};

const obtenerPorId = async (id) => {
    const jugador = await Jugador.findById(id).populate('equipo', 'nombre entrenador');
    if (!jugador) throw { status: 404, message: 'Jugador no encontrado.' };
    return jugador;
};

const crear = async (datos) => {
    const equipo = await Equipo.findById(datos.equipo);
    if (!equipo) throw { status: 404, message: 'Equipo no encontrado.' };

    const jugador = new Jugador(datos);
    await jugador.save();

    // Agregar referencia al equipo
    equipo.jugadores.push(jugador._id);
    await equipo.save();

    return jugador;
};

const actualizar = async (id, datos) => {
    const jugador = await Jugador.findById(id);
    if (!jugador) throw { status: 404, message: 'Jugador no encontrado.' };

    // Si cambió de equipo, actualizar referencias
    if (datos.equipo && datos.equipo !== jugador.equipo.toString()) {
        // Sacar del equipo anterior
        await Equipo.findByIdAndUpdate(jugador.equipo, {
            $pull: { jugadores: id },
        });
        // Agregar al nuevo equipo
        const nuevoEquipo = await Equipo.findById(datos.equipo);
        if (!nuevoEquipo) throw { status: 404, message: 'Nuevo equipo no encontrado.' };
        nuevoEquipo.jugadores.push(id);
        await nuevoEquipo.save();
    }

    const jugadorActualizado = await Jugador.findByIdAndUpdate(id, datos, {
        new: true,
        runValidators: true,
    }).populate('equipo', 'nombre');

    return jugadorActualizado;
};

const eliminar = async (id) => {
    const jugador = await Jugador.findById(id);
    if (!jugador) throw { status: 404, message: 'Jugador no encontrado.' };

    // Quitar referencia del equipo
    await Equipo.findByIdAndUpdate(jugador.equipo, {
        $pull: { jugadores: id },
    });

    await jugador.deleteOne();
    return { mensaje: 'Jugador eliminado correctamente.' };
};

module.exports = { obtenerTodos, obtenerPorId, crear, actualizar, eliminar };
