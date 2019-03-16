const express = require('express');
const router = express.Router();
// Requiere al controlador
const cupon_controller = require('../controllers/cupon.controller');

router.post('/agregarCupon', cupon_controller.agregarCupon);

module.exports = router;