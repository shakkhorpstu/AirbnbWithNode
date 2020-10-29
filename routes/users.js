const express = require('express');
const router = express.Router();
const authenticatedMiddleware = require('../app/middleware/authenticated');
const UserController = require('../app/controllers/UserController');
const AuthenticationController = require('../app/controllers/AuthenticationController');

router.get('/', UserController.index);
router.post('/', AuthenticationController.signup);
router.get('/verify/:token', AuthenticationController.verifyToken);
router.post('/login', AuthenticationController.signin);

module.exports = router;
