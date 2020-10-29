const Joi = require('@hapi/joi');

const roomSchema = Joi.object({
    title: Joi.string().required(),
    rent_value: Joi.string().required(),
    room_number: Joi.string(),
    image: Joi.string(),
    hotel_id: Joi.string(),
    hotel: Joi.object()
});

module.exports = {
    roomSchema
}