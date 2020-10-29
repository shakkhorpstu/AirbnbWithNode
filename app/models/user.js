const { required } = require('@hapi/joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: false
  },
  image: {
    type: String,
    required: false
  },
  lat: {
    type: String,
    required: false
  },
  lng: {
    type: String,
    required: false
  },
  location_str: {
    type: String,
    required: false
  },
  verified: {
    type: Boolean,
    required: false,
    default: false
  },
  verify_token: {
    type: String,
    required: false
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;