const express = require('express');
const router = express.Router();
const partidoController = require('../controllers/partido.controller');
const { verificarToken } = require('../middlewares/auth.middleware');
const { validarObjectId } = require('../middlewares/validarObjectId');

// ── Rutas públicas ────────────────────────────────────────────────────────────
router.get('/', partidoController.obtenerTodos);
router.get('/:id', validarObjectId, partidoController.obtenerPorId);

// ── Rutas protegidas ──────────────────────────────────────────────────────────
router.post('/', verificarToken, partidoController.crear);
router.put('/:id', verificarToken, validarObjectId, partidoController.actualizar);
router.delete('/:id', verificarToken, validarObjectId, partidoController.eliminar);

// PATCH /api/partidos/:id/resultado — carga o corrige el resultado
router.patch('/:id/resultado', verificarToken, validarObjectId, partidoController.cargarResultado);

module.exports = router;
