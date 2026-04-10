const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    // Error de validación de Mongoose
    if (err.name === 'ValidationError') {
        const mensajes = Object.values(err.errors).map((e) => e.message);
        return res.status(400).json({ mensaje: 'Error de validación', errores: mensajes });
    }

    // Error de duplicado (clave única)
    if (err.code === 11000) {
        const campo = Object.keys(err.keyValue)[0];
        return res.status(400).json({ mensaje: `El campo '${campo}' ya existe.` });
    }

    // Error de CastError (ID inválido)
    if (err.name === 'CastError') {
        return res.status(400).json({ mensaje: 'ID inválido.' });
    }

    res.status(err.status || 500).json({
        mensaje: err.message || 'Error interno del servidor.',
    });
};

module.exports = errorHandler;
