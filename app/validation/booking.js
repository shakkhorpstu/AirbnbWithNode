const Joi = require('@hapi/joi');

const bookingSchema = Joi.object({
    hotel_id: Joi.string().required(),
    user_id: Joi.string().required(),
    room_id: Joi.string().required(),
    booked_from: Joi.date().required(),
    booked_to: Joi.date().required(),
    total_rent_value: Joi.number().required(),
    hotel: Joi.object(),
    user: Joi.object(),
    room: Joi.object()
});

module.exports = {
    bookingSchema
}