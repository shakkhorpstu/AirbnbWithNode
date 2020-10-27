const Joi = require('@hapi/joi');

const hotelSchema = Joi.object({
    title: Joi.string().required(),
    city: Joi.string().required(),
    lat: Joi.string(),
    lng: Joi.string(),
    country: Joi.string(),
    image: Joi.string()
});

module.exports = {
    hotelSchema
}