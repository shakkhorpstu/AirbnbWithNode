const { required } = require('@hapi/joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hotelSchema = new Schema({
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
}, { timestamps: true });

const Hotel = mongoose.model('Hotel', hotelSchema);
module.exports = Hotel;