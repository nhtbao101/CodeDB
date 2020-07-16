const express = require('express');
const controller = require('../controllers/users.controller');
var router = express.Router();

router.get('/', controller.index);

//search with keyword
router.get('/search', controller.search);

router.get('/create', controller.create)

router.post('/create', controller.postCreate);

router.get('/:id', controller.getID);
module.exports = router;