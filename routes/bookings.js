const express = require('express');
const router = express.Router();
const BookingController = require('../app/controllers/BookingController');

router.get('/', BookingController.index);
router.post('/', BookingController.store);
router.delete(':/id', BookingController.destroy);

module.exports = router;