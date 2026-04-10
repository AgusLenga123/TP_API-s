const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema(
    {
        usuario: {
            type: String,
            required: [true, 'El usuario es requerido'],
            unique: true,
            trim: true,
        },
        passwordHash: {
            type: String,
            required: [true, 'La contraseña es requerida'],
        },
    },
    { timestamps: true }
);

// Hash de contraseña antes de guardar
adminSchema.pre('save', async function (next) {
    if (!this.isModified('passwordHash')) return next();
    const salt = await bcrypt.genSalt(10);
    this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
    next();
});

// Comparar contraseña
adminSchema.methods.compararPassword = async function (passwordIngresada) {
    return await bcrypt.compare(passwordIngresada, this.passwordHash);
};

module.exports = mongoose.model('Admin', adminSchema);
