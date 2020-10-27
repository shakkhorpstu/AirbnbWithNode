const Joi = require('@hapi/joi');

const signupValidation = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string(),
    email: Joi.string().required().email(),
    password: Joi.string().required()
});

const signinValidation = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required()
});

module.exports = {
    signupValidation,
    signinValidation
}