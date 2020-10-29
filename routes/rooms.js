const express = require('express');
const router = express.Router();
const RoomController = require('../app/controllers/RoomController');

router.get('/', RoomController.index);
router.get('/:id', RoomController.show);
router.get('/hotel/:id', RoomController.getRoomByHotel);
router.post('/', RoomController.store);
router.put('/:id', RoomController.update);
router.delete(':/id', RoomController.destroy);

module.exports = router;