var express = require('express');
var router = express.Router();
const UserController = require('../app/controllers/UserController');

router.get('/', UserController.index);

module.exports = router;
