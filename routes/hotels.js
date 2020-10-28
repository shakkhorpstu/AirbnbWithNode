const express = require('express');
const router = express.Router();
const HotelController = require('../app/controllers/HotelController');

router.get('/', HotelController.index);
router.get('/:id', HotelController.show);
router.post('/', HotelController.store);
router.put('/:id', HotelController.update);
router.delete(':/id', HotelController.destroy);

module.exports = router;