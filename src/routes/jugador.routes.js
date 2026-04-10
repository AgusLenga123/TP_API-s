const express = require('express');
const router = express.Router();
const jugadorController = require('../controllers/jugador.controller');
const { verificarToken } = require('../middlewares/auth.middleware');
const { validarObjectId } = require('../middlewares/validarObjectId');

// ── Rutas públicas ────────────────────────────────────────────────────────────
router.get('/', jugadorController.obtenerTodos);
router.get('/:id', validarObjectId, jugadorController.obtenerPorId);

// ── Rutas protegidas ──────────────────────────────────────────────────────────
router.post('/', verificarToken, jugadorController.crear);
router.put('/:id', verificarToken, validarObjectId, jugadorController.actualizar);
router.delete('/:id', verificarToken, validarObjectId, jugadorController.eliminar);

module.exports = router;
