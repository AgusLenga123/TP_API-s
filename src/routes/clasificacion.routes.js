const express = require('express');
const router = express.Router();
const clasificacionController = require('../controllers/clasificacion.controller');

// ── Ruta pública ──────────────────────────────────────────────────────────────
// GET /api/clasificacion
router.get('/', clasificacionController.obtenerClasificacion);

module.exports = router;
