const { required } = require('@hapi/joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    hotel_id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    room_id: {
        type: String,
        required: true
    },
    booked_from: {
        type: Date,
        required: true
    },
    booked_to: {
        type: Date,
        required: true
    },
    total_rent_value: {
        type: Number,
        required: true
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
            }
        }
    },
    user: {
        type: {
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
            }
        }
    },
    room: {
        type: {
            title: {
                type: String,
                required: true,
            },
            room_number: {
                type: String,
                required: true,
            },
            rent_value: {
                type: String,
                required: true
            },
            image: {
                type: String,
                required: false
            }
        }
    }
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;