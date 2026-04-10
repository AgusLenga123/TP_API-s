const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// POST /api/auth/login
router.post('/login', authController.login);

// POST /api/auth/setup  — solo para crear el primer admin
// Recomendación: deshabilitar o proteger con un secret de entorno en producción
router.post('/setup', authController.crearAdmin);

module.exports = router;
