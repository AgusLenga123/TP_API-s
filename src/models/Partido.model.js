const mongoose = require('mongoose');

const resultadoSchema = new mongoose.Schema(
    {
        puntosLocal: { type: Number, default: null },
        puntosVisitante: { type: Number, default: null },
    },
    { _id: false }
);

const partidoSchema = new mongoose.Schema(
    {
        equipoLocal: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Equipo',
            required: [true, 'El equipo local es requerido'],
        },
        equipoVisitante: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Equipo',
            required: [true, 'El equipo visitante es requerido'],
        },
        fecha: {
            type: Date,
            required: [true, 'La fecha es requerida'],
        },
        horario: {
            type: String,
            required: [true, 'El horario es requerido'],
            trim: true,
        },
        lugar: {
            type: String,
            required: [true, 'El lugar es requerido'],
            trim: true,
        },
        resultado: {
            type: resultadoSchema,
            default: () => ({ puntosLocal: null, puntosVisitante: null }),
        },
        finalizado: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

// Validar que los equipos no sean el mismo
partidoSchema.pre('save', function (next) {
    if (this.equipoLocal.toString() === this.equipoVisitante.toString()) {
        return next(new Error('El equipo local y visitante no pueden ser el mismo'));
    }
    next();
});

module.exports = mongoose.model('Partido', partidoSchema);
