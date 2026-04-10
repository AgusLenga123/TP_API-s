const mongoose = require('mongoose');

const estadisticasSchema = new mongoose.Schema(
    {
        partidosJugados: { type: Number, default: 0 },
        partidosGanados: { type: Number, default: 0 },
        partidosEmpatados: { type: Number, default: 0 },
        partidosPerdidos: { type: Number, default: 0 },
        puntos: { type: Number, default: 0 },
        tantosAFavor: { type: Number, default: 0 },
        tantosEnContra: { type: Number, default: 0 },
    },
    { _id: false }
);

const equipoSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: [true, 'El nombre del equipo es requerido'],
            unique: true,
            trim: true,
        },
        entrenador: {
            type: String,
            required: [true, 'El entrenador es requerido'],
            trim: true,
        },
        jugadores: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Jugador',
            },
        ],
        estadisticas: {
            type: estadisticasSchema,
            default: () => ({}),
        },
    },
    { timestamps: true }
);

// Virtual para diferencia de tantos
equipoSchema.virtual('estadisticas.diferenciaDeTantos').get(function () {
    return this.estadisticas.tantosAFavor - this.estadisticas.tantosEnContra;
});

module.exports = mongoose.model('Equipo', equipoSchema);
