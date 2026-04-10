const mongoose = require('mongoose');

const validarObjectId = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ mensaje: 'El ID proporcionado no es válido.' });
    }
    next();
};

module.exports = { validarObjectId };
