const express = require('express');
const router = express.Router();
const users = require('./users');
const hotels = require('./hotels');
const rooms = require('./rooms');
const bookings = require('./bookings');
const HotelController = require('../app/controllers/HotelController');

router.get('/', HotelController.index);

router.use('/users', users);
router.use('/hotels', hotels);
router.use('/rooms', rooms);
router.use('/bookings', bookings);

module.exports = router;
