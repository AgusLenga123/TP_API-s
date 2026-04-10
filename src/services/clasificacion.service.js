const Equipo = require('../models/Equipo.model');

const obtenerClasificacion = async () => {
    const equipos = await Equipo.find().select(
        'nombre entrenador estadisticas'
    );

    const tabla = equipos.map((equipo) => {
        const est = equipo.estadisticas;
        const diferenciaDeTantos = est.tantosAFavor - est.tantosEnContra;

        return {
            equipoId: equipo._id,
            nombre: equipo.nombre,
            entrenador: equipo.entrenador,
            partidosJugados: est.partidosJugados,
            partidosGanados: est.partidosGanados,
            partidosEmpatados: est.partidosEmpatados,
            partidosPerdidos: est.partidosPerdidos,
            puntos: est.puntos,
            tantosAFavor: est.tantosAFavor,
            tantosEnContra: est.tantosEnContra,
            diferenciaDeTantos,
        };
    });

    // Ordenar según reglas del TPO:
    // 1° Puntos (desc)
    // 2° Diferencia de tantos (desc)
    // 3° Tantos a favor (desc)
    tabla.sort((a, b) => {
        if (b.puntos !== a.puntos) return b.puntos - a.puntos;
        if (b.diferenciaDeTantos !== a.diferenciaDeTantos)
            return b.diferenciaDeTantos - a.diferenciaDeTantos;
        return b.tantosAFavor - a.tantosAFavor;
    });

    // Agregar posición
    return tabla.map((equipo, index) => ({
        posicion: index + 1,
        ...equipo,
    }));
};

module.exports = { obtenerClasificacion };
