const express = require('express');
const controller = require('../controllers/users.controller');
const authMiddleware = require('../middleware/auth.middleware');
const validation = require('../validation/user.validation');
var router = express.Router();

router.get('/', authMiddleware.requireAuth, controller.index);

//search with keyword
router.get('/search', authMiddleware.requireAuth, controller.search);

router.get('/cookie', (req, res, next) => {
    res.cookie('user-id', 1234);
    res.send('hello');
});

router.get('/create', authMiddleware.requireAuth, controller.create)

router.post('/create', validation.postCreate, controller.postCreate);

router.get('/:id', controller.getID);
module.exports = router;