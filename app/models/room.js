const { required } = require('@hapi/joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  title: {
    type: String,
    required: false,
  },
  hotel: {
    type: {
        title: {
            type: String,
            required: true,
        },
        lat: {
            type: String,
            required: false,
        },
        lng: {
            type: String,
            required: false
        },
        city: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: false
        },
        image: {
            type: String,
            required: false
        }
    }
  },
  rent_value: {
    type: String,
    required: true
  },
  room_number: {
    type: String,
    required: false
  },
  image: {
    type: String,
    required: false
  },
  hotel_id: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Room = mongoose.model('Room', roomSchema);
module.exports = Room;