const Joi = require('joi');

const createUserServiceSchema = Joi.object({
    first_name: Joi.string().trim().required(),
    last_name: Joi.string().trim().required(),
    email: Joi.string().trim().required().email(),
    phone: Joi.number().required().min(1000000000).max(9999999999),
}).options({ abortEarly: false });

module.exports = createUserServiceSchema;
