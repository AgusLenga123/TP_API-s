const mongoose = require('mongoose');

const jugadorSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: [true, 'El nombre es requerido'],
            trim: true,
        },
        apellido: {
            type: String,
            required: [true, 'El apellido es requerido'],
            trim: true,
        },
        categoria: {
            type: String,
            required: [true, 'La categoría es requerida'],
            trim: true,
        },
        equipo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Equipo',
            required: [true, 'El equipo es requerido'],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Jugador', jugadorSchema);
