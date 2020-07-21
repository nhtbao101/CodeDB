const express = require('express');
const controller = require('../controllers/product.controller')
const authMiddleware = require('../middleware/auth.middleware');
const router = express.Router();

router.get('/', authMiddleware.requireAuth, controller.index);

router.get('/search', controller.search);

module.exports = router;