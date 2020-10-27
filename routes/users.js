var express = require('express');
var router = express.Router();
const authenticatedMiddleware = require('../app/middleware/authenticated');
const UserController = require('../app/controllers/UserController');
const AuthenticationController = require('../app/controllers/AuthenticationController');

router.get('/', UserController.index);
router.post('/', AuthenticationController.signup);
router.post('/login', AuthenticationController.signin);

module.exports = router;
