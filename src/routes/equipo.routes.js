const express = require('express');
const router = express.Router();
const equipoController = require('../controllers/equipo.controller');
const { verificarToken } = require('../middlewares/auth.middleware');
const { validarObjectId } = require('../middlewares/validarObjectId');

// ── Rutas públicas ────────────────────────────────────────────────────────────
router.get('/', equipoController.obtenerTodos);
router.get('/:id', validarObjectId, equipoController.obtenerPorId);

// ── Rutas protegidas ──────────────────────────────────────────────────────────
router.post('/', verificarToken, equipoController.crear);
router.put('/:id', verificarToken, validarObjectId, equipoController.actualizar);
router.delete('/:id', verificarToken, validarObjectId, equipoController.eliminar);

module.exports = router;
